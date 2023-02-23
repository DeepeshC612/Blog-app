const express = require("express");
const Router = express.Router();
const user = require("../controllers/userControllers");
const validation = require("../validation/users/userValidation");
const { upload } = require("../Middlewares/multiStoreMiddleware");

Router.post(
  "/register",
  upload.single("profilePic"),
  validation.registerUserValidation,
  user.userSignup
);
Router.post(
  "/login",
  validation.loginUserValidation,
  user.userLogin
);
Router.post(
  "/email_reset_pass", 
  user.emailForResetPass
);
Router.post(
  "/new_pass/:id/:token",
  validation.resetPassValidation, 
  user.userResetPass
);

module.exports = Router;
