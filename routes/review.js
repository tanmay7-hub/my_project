const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utlis/wrapAsync");
const {IsLoggedIn, validateReview, isReviewOwner}=require("../middleware.js");
const reviewController=require("../controller/review.js")
//review route
router.post("/",IsLoggedIn,validateReview,wrapAsync(reviewController.createReview));
//Delete review route
router.delete("/:reviewId",IsLoggedIn,isReviewOwner ,wrapAsync(reviewController.deleteReview));
module.exports=router;