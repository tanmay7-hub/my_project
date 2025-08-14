const express=require("express");
const router=express.Router();

const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { SaveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");
const { route } = require("./listing.js");


router
.route("/signup")
.get(userController.signupRenderForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.loginRenderForm)
.post(SaveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;