const mongoose = require("mongoose");

// password reset token, email verification token
const tokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //expires: 3600, // sec
  },
});

module.exports = mongoose.model("Token", tokenSchema);