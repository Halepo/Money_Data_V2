const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    },
});

module.exports = mongoose.model("User", userSchema);