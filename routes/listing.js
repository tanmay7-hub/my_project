const express=require("express");
const router=express.Router();
const wrapAsync=require("../utlis/wrapAsync")
const listing=require("../models/listing.js")
const {IsLoggedIn, IsOwner,validateListing}=require("../middleware.js");
const listingController=require("../controller/listing.js");
const {storage}=require("../cloudConfig.js");
const multer=require("multer");
const upload=multer({storage});


router
.route("/")
.get(wrapAsync(listingController.index))
 .post(IsLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));



//new route
router.get("/new",IsLoggedIn,listingController.newListingForm);

router
.route("/search")
.get(listingController.SearchListing);




router
.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(IsLoggedIn,IsOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(IsLoggedIn,IsOwner,wrapAsync(listingController.deleteListing));




//edit route
router.get("/:id/edit",IsLoggedIn,IsOwner,wrapAsync(listingController.editListing));



module.exports=router;