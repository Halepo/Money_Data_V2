const express = require("express");
const {isAuthenticated} = require("../middleware/jwtAuth");
const {isAdmin} = require("../middleware/admin");
const advertisementController = require("../controller/advertisementController");

const app = express();

app.use(express.json());

// Get all advertisements
app.get('/', isAuthenticated, isAdmin, advertisementController.listAdvertisement);

// Get advertisement by ID
app.get('/:id', isAuthenticated, isAdmin, advertisementController.getAdvertisementByID);

// Add new advertisement
app.post('/', isAuthenticated, isAdmin, advertisementController.addAdvertisement);

// Update advertisement
app.put('/:id', isAuthenticated, isAdmin, advertisementController.updateAdvertisement);

// Delete advertisement
app.delete('/:id', isAuthenticated, isAdmin, advertisementController.deleteAdvertisement);

module.exports = app;