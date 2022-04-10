const mongoose = require("mongoose");

var viewcountSchema = new mongoose.Schema({
    jobId: String,      // implement onDelete: CASCADE
    ip: String
});

module.exports = mongoose.model("viewCount", viewcountSchema);