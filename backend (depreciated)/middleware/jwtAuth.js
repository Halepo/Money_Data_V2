'use strict';
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const config = process.env;

const isAuthenticated = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const token = bearerToken.split(' ')[1]
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded
    console.log(req.user, 'request user')

    // req.user = decoded;
    User.findOne({
      _id: req.user.user_id,
      verified: true
    })
      .then((user) => {
        if (user === null) {
          res.status(401).json({
            message: "No user found!",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });

  } catch (err) {
    return res.status(401).send(err);
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