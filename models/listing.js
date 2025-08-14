const mongoose = require("mongoose");
const Review=require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
  type: String,
  enum: [ 
    "Trending",
    "Rooms",
    "City",
    "Mountain",
    "Castles",
    "Pools",
    "Camping",
    "Farms",
    "Arctic"],
  required: true
  },
  description: String,
  image:{
    url: String,
    filename: String,
}, 
  price:{
    type: Number,
    default:0,
  },
  location: String,
  country: String,
  reviews:[{
    type:Schema.Types.ObjectId,
    ref:"Review"
  },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  geometry:{
     type: {
    type: String,
    enum: ['Point'],
    required: true
    },
  coordinates: {
    type: [Number],
    required: true
   }},
});
 listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
     await Review.deleteMany({_id:{$in:listing.reviews}});  
  }
 });
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;