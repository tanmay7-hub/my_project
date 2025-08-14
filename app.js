  if(process.env.NODE_ENV !== "production"){
     require("dotenv").config();
  }

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utlis/ExpressError");
const session = require("express-session");
const MongoStore = require('connect-mongo');


const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
// Importing routes
const listingRoute=require("./routes/listing.js");
const reviewRoute=require("./routes/review.js");
const UserRoute=require("./routes/user.js");
const paymentRoute=require("./routes/payment.js");


//mongoose connection
const dbUrl=process.env.ATLAS_DB_URL;
const main=async()=>{

     await mongoose.connect(dbUrl);
}
// Connect to MongoDB
main().then(()=>{
   console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
      secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",()=>{
   console.log("ERROR IN MONGO STORE",err);
});

const sessionOptions={
     store:store,
     secret:process.env.SECRET,
     resave:false,
     saveUninitialized:true,
     cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
     }
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
   res.locals.success=req.flash("success");
   res.locals.error=req.flash("error");
   res.locals.currUser=req.user;
   next();
});

//Middleware 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));




//routes
app.use("/listing",listingRoute);
app.use("/listings/:id/reviews",reviewRoute);
app.use("/",UserRoute);
app.use("/",paymentRoute);
// Error handling
//404 error handler for undefined routes
app.all(/.*/, (req, res, next) => {
        next(new ExpressError(404, "Page Not Found"));
});
// General error handler (for thrown errors)
app.use((err, req, res, next) => {
   const { statusCode = 500, message = "Something went wrong!" } = err;
   res.status(statusCode).render("listings/error.ejs", {err});
});
app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});
