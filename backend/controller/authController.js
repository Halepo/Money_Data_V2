'use strict';
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {verifyRefresh} = require("../middleware/jwtAuth");
const rateLimiter = require('../middleware/ratelimiter');
const nodeMailer = require('../config/nodemailer');
const formateForMail = require('../config/formatformail');
const { validateEmail } = require('../middleware/validators/emailValidator');
const { validatePassword } = require('../middleware/validators/passwordValidator');
const Company = require("../model/company");
const Token = require("../model/token");

const app = express();

app.use(express.json());
app.use(rateLimiter);

const register = async(req, res, next) => {
    try {
      
        // Get input
        const { name, email, password, passwordConfirmation } = req.body;
    
        // Validate input
        if (!(email && password && name)) {
          return res.status(400).send("All inputs are required");
        }
    
        // Check if company already exists
        const oldCompany = await Company.findOne({ $or:[ {'name':name}, {'email':email} ]  });
    
        if (oldCompany) {
          return res.status(409).send("Company Already Exists. Please Login");
        }
    
        //Encrypt password
        let encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create company in our database
        const company = await Company.create({
          name: name,
          email: email.toLowerCase(),
          password: encryptedPassword,
          verified: false,
          created: Date.now()
        });
    
        // Create tokens
        const token = jwt.sign(
          { company_id: company._id, role: company.role, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
        const refreshToken = jwt.sign({ company_id: company._id }, process.env.TOKEN_KEY, {
          expiresIn: "24h",
        });

        // save token
        company.token = token;

        // save refresh token
        company.refreshToken = refreshToken
    
        const emailVerification = await new Token({
          company_id: company._id,
          token: crypto.randomBytes(32).toString("hex"),
          createdAt: Date.now(),
        }).save();
    
        const link = `api/auth/verify/${emailVerification.token}`;  
        const msg = formateForMail.formateForMail('verifyEmail', link);
    
        nodeMailer.nodeMailer(company.email, 'Asketari Password Assistance', msg); 
    
        // return new company
        return res.status(201).json(company);
        } catch (err) {
            console.log(err);
        }
}

const confirmEmail = async(req, res, next) => {
    try {

        const token = await Token.findOne({
          token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
    
        const company = await Company.findOne({ _id: token.company_id });
    
        await Company.updateOne(
          { _id: token.company_id },
          { $set: { verified: true } }
        );
    
        await Token.findByIdAndRemove(token._id);
    
        res.status(400).send("Email verified sucessfully");
      } catch (error) {
        res.status(400).send("An error occured");
      }
}

const login = async(req, res, next) => {
    try {

        // Get input
        const { email, password } = req.body;
    
        // Validate input
        if (!(email && password)) {
          return res.status(400).send("All input is required");
        }
        // Check if company exists
        const company = await Company.findOne({ email });

    
        if (company && (await bcrypt.compare(password, company.password))) {
          // Create tokens
          const token = jwt.sign(
            { company_id: company._id, role: company.role, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "5h",
            }
          );
          const refreshToken = jwt.sign({ company_id: company._id }, process.env.TOKEN_KEY, {
            expiresIn: "24h",
          });
    
          // save token
          company.token = token;

          // save refresh token
          company.refreshToken = refreshToken
  
          // company
          return res.status(200).json(company);
        }
        return res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
}

const refreshToken = async(req, res, next) => {
  try {

    const { email, refreshToken } = req.body;
    const isValid = verifyRefresh(email, refreshToken);
    if (!isValid) {
      return res.status(401).json({ success: false, error: "Invalid token, please login again" });
    }

    const company = await Company.findOne({ email });
    
    if (company && (await bcrypt.compare(password, company.password))) {
      // Create token
      const token = jwt.sign(
        { company_id: company._id, role: company.role, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
    
      // save token
      company.token = token;

      return res.status(200).json({ success: true, token });
    }
  } catch (err) {
    console.log(err);
  }
}


module.exports = {register, confirmEmail, login, refreshToken};