const User=require("../models/user.js");
module.exports.signupRenderForm=(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signup=async(req,res)=>{
  try{
    let{username,email,password}=req.body;
    const newUser=new User({username,email});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
      if(err){
        return next(err);
      }
       req.flash("success","Welcome to Wanderlust!");
      res.redirect("/listing");
    });
   
  }
  catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
};
module.exports.loginRenderForm=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back!");
    res.redirect(res.locals.RedirectUrl || "/listing");
};
module.exports.logout=(req,res,next)=>{
     req.logout((err)=>{
       if(err){
         return next(err);
       }
        req.flash("success","logged out successfully");
        res.redirect("/listing");
     });
};