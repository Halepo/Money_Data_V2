const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "admin"]
  },
  token: { 
    type: String 
  },
  refreshToken: { 
    type: String 
  },
  verified: { 
    type: Boolean
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subscription"
  },
  contactNumber: {
    type: String,
    validate: {
      validator: function (v) {
        //return v !== "" ? /  /.test(v) : true;
      },
      msg: "Phone number is invalid!",
    },
  },
  // description
  // size
  // location
  // company image
  // active jobs
});

module.exports = mongoose.model("company", companySchema);