const mongoose = require("mongoose");

// password reset token, email verification token
const tokenSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "company",
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