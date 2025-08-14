const listing=require("../models/listing.js");
const mongoose=require("mongoose");
const ExpressError=require("../utlis/ExpressError");
 const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
  let map_token= process.env.MAP_TOKEN;
 const geocodingClient = mbxGeocoding({ accessToken:map_token });


module.exports.index=async(req,res)=>{
     const { category } = req.query;
     let query = {};

    if (category && category.trim() !== "") {
      query.category = category;
   }
     const allListings= await listing.find(query);
    res.render("listings/index.ejs",{allListings,showFilter:true});
};
module.exports.newListingForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res, next) => {
    let { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new ExpressError("Page not found");
        err.statusCode = 404;
        return next(err);
    }
    const listingDetails = await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if (!listingDetails) {
        req.flash("error", "Listing does not exist");
        res.redirect("/listing");
        return;
    }
     
    res.render("listings/show.ejs", { listingDetails } );
};
module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    const  listingDetails= await listing.findById(id);
    if (!listingDetails) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listing");
    }
    let originalImageUrl=listingDetails.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");

    res.render("listings/edit.ejs",{listingDetails,originalImageUrl});
};
module.exports.updateListing=async(req,res)=>{
   let {id}=req.params;
    let response= await  geocodingClient.forwardGeocode({
         query: req.body.listing.location,
         limit: 1
       }).send();
    let listings=await listing.findByIdAndUpdate(id,{... req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
         listings.image={url,filename};
         await listings.save();
    }
    listings.geometry = response.body.features[0].geometry;
    
    await listings.save();
   req.flash("success","Listing updated successfully!");
   res.redirect(`/listing/${id}`);
};
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully!");
    res.redirect("/listing");
};
module.exports.createListing=async(req,res,next)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Invalid listing data");
    }
      let response= await  geocodingClient.forwardGeocode({
         query: req.body.listing.location,
         limit: 1
       }).send();
     const newlisting= new listing (req.body.listing);
     newlisting.owner=req.user._id;
 
     console.log(newlisting);
     let url=req.file.path;
     let filename=req.file.filename;
     newlisting.image={url,filename};
     newlisting.geometry = response.body.features[0].geometry;
     await newlisting.save();
     req.flash("success","New listing created!");
     res.redirect("/listing");  

};
module.exports.SearchListing=async(req,res)=>{
    let filter=req.query.filterBy;
    let search=req.query.search;
    let query={};
    if(filter&& search){
        query[filter]={$regex:search,$options:"i"};
    }
     let allListings=await listing.find(query);
     if(allListings.length==0){
         req.flash("error", "Listing not found");
          res.redirect("/listing");
         return;
     }
     res.render("listings/index.ejs",{allListings});
};