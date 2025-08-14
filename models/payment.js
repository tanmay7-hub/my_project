const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const bookingSchema = new Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    status: { type: String, default: "confirmed" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
