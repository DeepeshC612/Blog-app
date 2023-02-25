require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../service/emailService");
const userSchema = require("../models/userModelSchema");

const userSignup = async (req, res) => {
  const regData = await new userSchema(req.body);
  isEmailExists = await userSchema.findOne({
    userEmail: req.body.userEmail,
  });
  if (isEmailExists != null) {
    res.status(409).json({
      success: "failure",
      message: "User already exists with this email",
    });
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      regData.userPass = await bcrypt.hash(req.body.userPass, salt);
      const filePath = `uploads${req.file.filename}`;
      regData.profilePic = filePath;
      await regData.save();
      res.status(201).json({
        success: "success",
        message: "Registered successfully",
      });
    } catch (err) {
      res.status(400).json({
        success: "failure",
        error: "Error occure " + err.message,
      });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { userEmail, userPass } = req.body;
    if (userEmail && userPass) {
      const user = await userSchema.findOne({ userEmail: userEmail });
      if (user != null) {
        const isMatch = await bcrypt.compare(userPass, user.userPass);
        if (user.userEmail === userEmail && isMatch) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res.status(200).send({
            success: "success",
            message: "Login success",
            userDetails: {
              userName: user.userName,
              userId: user._id,
              userEmail: user.userEmail,
            },
            token: token,
          });
        } else {
          res.status(401).send({
            success: "failure",
            message: "Email or Password is not valid",
          });
        }
      } else {
        res.status(401).send({
          success: "failure",
          message: "You are not valid register user",
        });
      }
    }
  } catch (Error) {
    res.status(400).send({
      success: "failure",
      error: "Error occure " + Error.message,
    });
  }
};

const emailForResetPass = async (req, res) => {
  const {userEmail} = req.body;
  try {
    const alreadyExists = await userSchema.findOne({ userEmail: userEmail });
    if (alreadyExists != null) {
      const secretKey = alreadyExists._id + process.env.JWT_SECRET_KEY;
      const token = await jwt.sign({ userId: alreadyExists._id }, secretKey, {
        expiresIn: "2d",
      });
      mail.sendMail(userEmail, alreadyExists._id, token);
      return res.status(200).json({
        success: "success",
        message: "Email send successfully please check your inbox",
        token: token,
        userId: alreadyExists._id,
      });
    } else {
      res.status(550).json({
        success: "failure",
        message: "You are not registered user",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: "failure",
      error: "Error occure " + err.message,
    });
  }
};

const userResetPass = async (req, res) => {
  const { newPass, confirmPass } = req.body
  const {id, token} = req.params
  try{
    const userExists = await userSchema.findById(id)
    const secretKey = userExists._id + process.env.JWT_SECRET_KEY
    jwt.verify(token, secretKey)
    if (newPass && confirmPass) {
      if (newPass !== confirmPass) {
        res.status(401).json({
          success: "failure",
          error: "New password & confirm password doesn't match"
        })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(confirmPass, salt)
        await userSchema.findByIdAndUpdate(userExists._id,{ $set: 
          { userPass: newHashPassword }
        })
        res.status(201).json({
          success: "success",
          message: "Password reset successfully"
        })
      }
    } else {
      res.status(403).json({
        success: "failure",
        message: "All fields are required"
      })
    }
  } catch(err) {
    res.status(500).json({
      success: "failure",
      message: "Error occure " + err.message
    })
  }
}

module.exports = {
  userSignup,
  userLogin,
  emailForResetPass,
  userResetPass,
};
