const mongoose = require("mongoose");

const loggerSchema =  new mongoose.Schema({
	ipAddress: {
		type: String,
		trim: true,
		required: [true, 'ipAddress is required']
	},
	method: {
		type: String,
		trim: true,
		required: [true, 'request method is required']
	},
    URL: {
		type: String,
		trim: true,
		required: [true, 'URL is required']
	},
	statusCode: {
		type: Number,
		trim: true,
		required: [true, 'statusCode is required']
	},
    header: {
		type: String,
		trim: true,
		required: [true, 'header is required']
	},
	time: {
		type: String,
		trim: true,
		required: [true, 'time is required']
	}
})

module.exports = mongoose.model("logger", loggerSchema);