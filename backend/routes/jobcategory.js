const express = require("express");
const { isAuthenticated } = require("../middleware/jwtAuth");
const { isAdmin } = require("../middleware/admin");
const jobCategoryController = require("../controller/jobCategoryController");

const app = express();

app.use(express.json());

// Get a list of Categories
app.get("/", isAuthenticated, isAdmin, jobCategoryController.listCategory);

// Get Category by ID
//app.get("/:id", jobCategoryController.getUserByID);

// Edit Category
app.put("/:id", isAuthenticated, isAdmin, jobCategoryController.updateCategory);

// Add new Category
app.post("/", isAuthenticated, isAdmin, jobCategoryController.addCategory);

// Delete a Category
app.delete("/:id", isAuthenticated, isAdmin, jobCategoryController.deleteCategory);

module.exports = app;