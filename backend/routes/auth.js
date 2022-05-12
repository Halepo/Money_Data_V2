const express = require("express");
const rateLimiter = require('../middleware/ratelimiter');
const { validateEmail } = require('../middleware/validators/emailValidator');
const { validatePassword } = require('../middleware/validators/passwordValidator');
const authController = require("../controller/authController");
const { isAuthenticated } = require("../middleware/jwtAuth");

const app = express();
app.use(rateLimiter);

// Register
app.post("/register", authController.register);

// Confirm email
app.get("/verify/:token", authController.confirmEmail);

//resend email


// Login
app.post("/login", validateEmail, authController.login);

// Refresh
app.post("/refreshtoken", isAuthenticated, authController.refreshToken);

module.exports = app;