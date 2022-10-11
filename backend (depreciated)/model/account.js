const mongoose = require("mongoose");

// password reset token, email verification token
const accountSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    accountNumber: {
        type: Number,
        required: false,
    },
    accountBalance: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("account", accountSchema);