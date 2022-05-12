const mongoose = require('mongoose');
const FKValidator = require("../middleware/validators/foreignkeyValidator");

const advertisementSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    jobTitle: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    jobDetail: {
        type: String,
        required: true,
        minlength: 10
    },
    noOfPosition: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },
    jobType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobtype",
        validate: {
            isAsync: true,
            validator: function (value) {
                return FKValidator(mongoose.model("jobtype"), value)
            },
            message: `Could not get job type`
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
            validator: function (value) {
                return FKValidator(mongoose.model("location"), value)
            },
            message: `Could not get location`
        }
    },
    publishDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    expireDate: {
        type: Date
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        unique: true
    }
});

module.exports = mongoose.model("advertisement", advertisementSchema);