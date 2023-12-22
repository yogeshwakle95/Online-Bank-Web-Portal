const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter Your First Name"],
    maxLength: [20, "Name connot exceed 20 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
    maxLength: [20, "Name connot exceed 20 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  mobile: {
    type: Number,
    required: [true, "Please Enter Your Mobile no."],
    // maxLength: [11, "Phone connot exceed 11 numbers"],
    // minLength: [9, "Phone no. should have more than 9 numbers"],
  },
  username: {
    type: String,
    required: [true, "Please Enter Your Username."],
    maxLength: [20, "Name connot exceed 20 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 charaters"],
    select: false,
  },
 disable_status:{
    type:String,
    default:"false"
 },

  role: {
    type: String,
    default: "user",
  },
  userCreated: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//users
// _id
// firstName
// lastName
// phone
// email
// username
// password
// status
// dateCreated


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generating password reset token
userSchema.methods.getResetPasswordToken = function () {
  //Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hashing and adding to user schema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
