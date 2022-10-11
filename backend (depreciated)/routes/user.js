const express = require("express");
const { isAuthenticated } = require("../middleware/jwtAuth");
const userController = require("../controller/userController");

const app = express();

app.use(express.json());

// Get a list of Companies
app.get("/", userController.listUser);

// Get User profile by ID
app.get("/:id", userController.getUserByID);

// Edit user profile
app.put("/:id", isAuthenticated, userController.updateUser);

// Add new User
// app.post("/", userController.registerUser);

// Delete a User
app.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = app;