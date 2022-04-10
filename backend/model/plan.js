const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { 
    type: String,
    unique: true 
  },
  noOfJob: {
    type: Number,
    validate: [
      {
        validator: Number.isInteger,
        msg: "noOfPosition should be an integer",
      },
      {
        validator: function (value) {
          return value >= 0;
        },
        msg: "noOfJob should greater or equal to 0",
      },
    ],
  },
});

module.exports = mongoose.model("plan", planSchema);