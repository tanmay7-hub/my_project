const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const Booking=require("../models/payment");
const Listing=require("../models/listing");
const { IsLoggedIn } = require("../middleware");
const user = require("../models/user");
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
router.get("/booking-confirmation/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("listing user");
        if (!booking) {
            return res.status(404).send("Booking not found");
        }
        res.render("listings/bookingConfirmation", { booking });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
router.get("/my-bookings", IsLoggedIn, async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate("listing").populate("user");
    res.render("listings/ownerBookings", { bookings });
});
router.post("/save-booking",async(req,res)=>{
           try {
        const { listingId, checkIn, checkOut, totalAmount, paymentId } = req.body;

        const booking = new Booking({
            listing: listingId,
            user: req.user._id,
            checkIn,
            checkOut,
            totalAmount,
            paymentId
        });

        await booking.save();
        res.status(200).json({ bookingId: booking._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Booking save failed" });
    }
});
router.get("/owner/bookings",async (req, res) => {
    const bookings = await Booking.find({ listing: { $in: req.user.listings } })
        .populate("listing")
        .populate("user");
        res.render("ownerBookings", { bookings });
    });
router.post("/create-order", IsLoggedIn,async (req, res) => {
     try {
        const { listingId, checkIn, checkOut } = req.body;

        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).json({ error: "Listing not found" });

        // Calculate days
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (days <= 0) return res.status(400).json({ error: "Invalid date range" });

        // Calculate amount in paise
        const amount = listing.price * days * 100;

        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `order_rcptid_${listingId}`
        });

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
