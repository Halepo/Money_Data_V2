const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "plan"
  },
  // payment
});

module.exports = mongoose.model("subscription", subscriptionSchema);