const express = require('express');
const {isAuthenticated} = require("../middleware/jwtAuth");
const {isAdmin} = require("../middleware/admin");
const app = express();

app.use(express.json());

const jobTypeController = require('../controller/jobTypeController');

// Get all job types
app.get('/', isAuthenticated, isAdmin, jobTypeController.listjobType);

// Add new job type
app.post('/', isAuthenticated, isAdmin, jobTypeController.addjobType);


module.exports = app;