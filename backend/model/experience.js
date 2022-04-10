const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  name: { 
    type: String,
    unique: true 
  },
});

module.exports = mongoose.model("experience", experienceSchema);