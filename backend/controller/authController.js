'use strict';
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { verifyRefresh } = require("../middleware/jwtAuth");
const rateLimiter = require('../middleware/ratelimiter');
const nodeMailer = require('../config/nodemailer');
const formateForMail = require('../config/formatformail');
const { validateEmail } = require('../middleware/validators/emailValidator');
const { validatePassword } = require('../middleware/validators/passwordValidator');
const User = require("../model/user");
const Token = require("../model/token");
const validateUserInput = require('./validation/user')

const app = express();

app.use(express.json());
app.use(rateLimiter);

const register = async (req, res, next) => {
  const { errors, isValid } = validateUserInput(req.body);

  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {

    // Get input
    const { name, email, password, passwordConfirmation } = req.body;

    // Validate input
    if (!(email && password && name)) {
      return res.status(400).send("All inputs are required");
    }

    // Check if user already exists
    const oldUser = await User.findOne({ $or: [{ 'name': name }, { 'email': email }] });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      verified: false,
      created: Date.now()
    });

    // Create tokens
    const token = jwt.sign(
      { user_id: user._id, role: user.role, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    const refreshToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    });

    // save token
    user.token = token;

    // save refresh token
    user.refreshToken = refreshToken

    const emailVerification = await new Token({
      user_id: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      createdAt: Date.now(),
    }).save();

    const link = `api/auth/verify/${emailVerification.token}`;
    const msg = formateForMail.formateForMail('verifyEmail', link);

    nodeMailer.nodeMailer(user.email, 'Asketari Password Assistance', msg);

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

const confirmEmail = async (req, res, next) => {
  try {

    const token = await Token.findOne({
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    const user = await User.findOne({ _id: token.user_id });

    await User.updateOne(
      { _id: token.user_id },
      { $set: { verified: true } }
    );

    await Token.findByIdAndRemove(token._id);

    res.status(400).send("Email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
}

const login = async (req, res, next) => {
  try {

    // Get input
    const { email, password } = req.body;

    // Validate input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Check if user exists
    const user = await User.findOne({ email });


    if (user && (await bcrypt.compare(password, user.password))) {
      // Create tokens
      const token = jwt.sign(
        { user_id: user._id, role: user.role, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      const refreshToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
      });

      // save token
      user.token = token;

      // save refresh token
      user.refreshToken = refreshToken

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

const refreshToken = async (req, res, next) => {
  try {

    const { email, refreshToken } = req.body;
    const isValid = verifyRefresh(email, refreshToken);
    if (!isValid) {
      return res.status(401).json({ success: false, error: "Invalid token, please login again" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, role: user.role, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );

      // save token
      user.token = token;

      return res.status(200).json({ success: true, token });
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = { register, confirmEmail, login, refreshToken };