const mongoose = require("mongoose");

const jobTypeSchema = new mongoose.Schema({
  jobType: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

module.exports = mongoose.model("jobtype", jobTypeSchema);