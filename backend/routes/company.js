const express = require("express");
const {isAuthenticated} = require("../middleware/jwtAuth");
const companyController = require("../controller/companyController");

const app = express();

app.use(express.json());

// Get a list of Companies
app.get("/", companyController.listCompany);

// Get Company profile by ID
app.get("/:id", companyController.getCompanyByID);

// Edit company profile
app.put("/:id", isAuthenticated, companyController.updateCompany);

// Add new Company
//app.post("/", isAuthenticated, companyController.postCompany);

// Delete a Company
app.delete("/:id", isAuthenticated, companyController.deleteCompany);

module.exports = app;