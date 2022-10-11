const mongoose = require("mongoose");

// password reset token, email verification token
const incomeSchema = new mongoose.Schema({
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("income", incomeSchema);