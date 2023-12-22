const mongoose = require("mongoose");

const userAccountSchema = new mongoose.Schema({
  userId: {
   
    type:mongoose.Schema.ObjectId,
    ref: 'user',
    required:true
  },
  accounttype: {
    type: String,
    required: true,
  },
  accountnumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 100,
  },
  accountCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("UserAccount", userAccountSchema);
