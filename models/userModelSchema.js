const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPass:{
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  // profilePic:{
  //   type: String,
  //   required: true
  // },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

userSchema.set('timestamps', true)
module.exports = mongoose.model('user', userSchema)
