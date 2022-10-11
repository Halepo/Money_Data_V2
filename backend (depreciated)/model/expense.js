const mongoose = require("mongoose");

// password reset token, email verification token
const expenseSchema = new mongoose.Schema({
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "account",
    },
    amount: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("expense", expenseSchema);