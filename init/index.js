const mongoose = require('mongoose');
const initData= require("./data.js")
const Listing=require("../models/listing.js");


const main=async()=>{
     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
main().then(()=>{
   console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});


const initdb=async()=>{
     await Listing.deleteMany({});
      initData.data = initData.data.map(obj => ({ ...obj, owner: '6890a44d694e08cf1fc588cf' }));
     await Listing.insertMany(initData.data);
        console.log("Data inserted");
}

initdb();