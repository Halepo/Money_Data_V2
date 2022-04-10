'use strict';
const jwt = require("jsonwebtoken");
const Company = require("../model/company");
const config = process.env;

const isAuthenticated = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.company = decoded;

    Company.findOne({
      _id: req.company.company_id,
      verified: true
    })
      .then((company) => {
        if (company === null) {
          res.status(401).json({
            message: "Inactive",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const verifyRefresh = (email, token) => {
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    return decoded.email === email;
   } catch (error) {
    // console.error(error);
    return false;
   }
}

module.exports = { isAuthenticated, verifyRefresh };