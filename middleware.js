const listing = require("./models/listing");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utlis/ExpressError");
module.exports.IsLoggedIn=(req,res,next)=>{
   if(!req.isAuthenticated()){
         req.session.RedirectUrl=req.originalUrl;
         req.flash("error","You must be logged in to do that!");
         return res.redirect("/login");
   }
    next();
};
module.exports.SaveRedirectUrl=(req,res,next)=>{
      if(req.session.RedirectUrl){
            res.locals.RedirectUrl=req.session.RedirectUrl;
      }
      next();
};
module.exports.IsOwner= async(req,res,next)=>{
       let {id}=req.params;
       let listings= await listing.findById(id);
       if(!res.locals.currUser|| !listings.owner.equals(res.locals.currUser._id)){
            req.flash("error","You are not authorized to make any changes to this listing");
            return res.redirect(`/listing/${id}`);     
      }
      next();

};
module.exports.validateListing=(req,res,next)=>{
    const {error}=listingSchema.validate(req.body);
    if(error){
        let errMSg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,errMSg);
    }else{
        next();
    }
};
module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if(error){
        let errMSg=error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,errMSg);
    }else{
        next();
    }
};
module.exports.isReviewOwner=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!res.locals.currUser || !review || !review.owner || !review.owner.equals(res.locals.currUser._id)){
            req.flash("error","You are not the author of this review");
            return res.redirect(`/listing/${id}`);     
      }
      next();
};