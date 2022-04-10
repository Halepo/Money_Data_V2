const express = require("express");
const {isAuthenticated} = require("../middleware/jwtAuth");
const locationController = require("../controller/locationController");
const {isAdmin} = require("../middleware/admin");

const app = express();

app.use(express.json());

// Get a list of Locations
app.get("/", isAuthenticated, isAdmin, locationController.listLocation);

// Edit Location
app.put("/:id", isAuthenticated, isAdmin, locationController.updateLocation);

// Add new Location
app.post("/", isAuthenticated, isAdmin, locationController.addLocation);

// Delete a Location
app.delete("/:id", isAuthenticated, isAdmin, locationController.deleteLocation);

module.exports = app;