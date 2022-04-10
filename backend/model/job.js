const mongoose = require("mongoose");
const FKValidator = require("../middleware/validators/foreignkeyValidator");

const jobSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company",
        validate: {
          isAsync: true,
          validator: function(value) {
              return FKValidator(mongoose.model("company"), value)
          },
          message: `Invalid company ID`
        }
    },
    companyName: {
      type: String,
    },
    jobTitle: {
      type: String,
      required: true
    },
    jobDetail: {
      type: String,
      required: true,
      minlength: 10
    },
    noOfPosition: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "noOfPosition should be an integer",
        },
        {
          validator: function (value) {
            return value > 0;
          },
          msg: "noOfPosition should greater than 0",
        },
      ],
    },
    jobCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobcategory",
      validate: {
        isAsync: true,
        validator: function(value) {
            return FKValidator(mongoose.model("jobcategory"), value)
        },
        message: `Invalid job category`
      }
    },
    salary: {
      type: Number,
      validate: [
        {
          validator: Number.isInteger,
          msg: "Salary should be an integer",
        },
        {
          validator: function (value) {
            return value >= 0;
          },
          msg: "Salary should be positive",
        },
      ],
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "location",
      validate: {
        isAsync: true,
        validator: function(value) {
            return FKValidator(mongoose.model("location"), value)
        },
        message: `Invalid location`
      }
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: Date,
    },
    advertisedDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    expireDate: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.advertisedDate < value;
          },
            msg: "Deadline should be greater than advertisedDate",
        },
      ],
    },
    skillSet: [String],
    additionalSkill: [String],
    viewCount: {
      type: Number,
      default: 0,
    },
    uniqueIP: {
      type: Array,
    },
    jobType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobtype",
      validate: {
        isAsync: true,
        validator: function(value) {
            return FKValidator(mongoose.model("jobtype"), value)
        },
        message: `Invalid job type`
      }
    },
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "experience",
      validate: {
        isAsync: true,
        validator: function(value) {
            return FKValidator(mongoose.model("experience"), value)
        },
        message: `Invalid job experience`
      }
    },
    postedBy:{
      type: String
    },
    // companyProfile
    // competency
    // status
    // isAdvertised
});

module.exports = mongoose.model("job", jobSchema);

