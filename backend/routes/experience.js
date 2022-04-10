const express = require("express");
const {isAuthenticated} = require("../middleware/jwtAuth");
const {isAdmin} = require("../middleware/admin");
const experienceController = require("../controller/experienceController");

const app = express();

app.use(express.json());

// Get a list of Experiences
app.get("/", isAuthenticated, isAdmin, experienceController.listExperience);

// Edit Experience
app.put("/:id", isAuthenticated, isAdmin, experienceController.updateExperience);

// Add new Experience
app.post("/", isAuthenticated, isAdmin, experienceController.addExperience);

// Delete a Experience
app.delete("/:id", isAuthenticated, isAdmin, experienceController.deleteExperience);

module.exports = app;