const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location: { 
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
});

module.exports = mongoose.model("location", locationSchema);