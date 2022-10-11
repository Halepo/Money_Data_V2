const mongoose = require("mongoose");

// password reset token, email verification token
const categorySchema = new mongoose.Schema({
    category: {
        type: string,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("category", categorySchema);