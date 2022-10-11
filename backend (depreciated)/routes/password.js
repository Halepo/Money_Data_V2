const express = require("express");
const {isAuthenticated} = require("../middleware/jwtAuth");
const { validateEmail } = require('../middleware/validators/emailValidator');
const { validatePassword } = require('../middleware/validators/passwordValidator');
const passwordController = require("../controller/passwordController");

const app = express();
app.use(express.json());

// forgot password
app.post('/forgotpassword', passwordController.forgotPassword);

// reset password
app.post('/resetpassword', /* validatePassword */ passwordController.resetPassword);

// change password
app.post('/changepassword', isAuthenticated, /* validatePassword */ passwordController.changePassowrd);

module.exports = app;