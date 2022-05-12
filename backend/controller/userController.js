'use strict';
// require("dotenv").config();
const express = require("express");
const nodeMailer = require('../config/nodemailer');
const formateForMail = require('../config/formatformail');
const jwtAuth = require("../middleware/jwtAuth");
const User = require("../model/user");
const Job = require("../model/job");

//validation
const validateUserInput = require('./validation/user')

const registerUser = async (req, res, next) => {
  const { errors, isValid } = validateUserInput(req.body);

  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const data = req.body;

    let user = await new User({
      // poster req.user
      name: data.name,
      email: data.email,
      password: data.password,
      token: data.token,
      refreshToken: data.refreshToken,
    }).save()

    res.json({ message: "User added successfully to the database" });
  } catch (err) {
    console.log(err);
  }
}

const getUserByID = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user == null) {
        res.status(400).json({
          message: "User does not exist",
        });
        return;
      }
      // return active jobs posted by user


      // return user
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

const updateUser = (req, res, next) => {
  const user = req.user;

  if (req.params.id != user.user_id && user.role != "admin") {
    res.status(404).json({
      message: "Permission Denied",
    });
    return;
  }

  User.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      if (user == null) {
        res.status(404).json({
          message: "User does not exist",
        });
        return;
      }
      const data = req.body;

      // Update user detail ...
      if (data.userType) {
        user.userType = data.userType;
      }

      user
        .save()
        .then(() => {
          res.json({
            message: "Job details updated successfully",
          });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

const deleteUser = (req, res, next) => {
  const user = req.user;

  if (req.params.id != user.user_id && user.role != "admin") {
    res.status(404).json({
      message: "Permission Denied",
    });
    return;
  }

  User.findOneAndDelete({
    _id: req.params.id,
  })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "User does not exist",
        });
        return;
      }
      res.json({
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

const listUser = async (req, res, next) => {
  try {

    let searchQueries = {};

    // Get input
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    // Pagination
    const startPage = (page - 1) * limit;
    const endPage = (page) * limit;

    // find companies by name
    if (req.query.userName) {
      searchQueries = {
        ...searchQueries,
        name: {
          $regex: new RegExp(req.query.userName, "i"),
        },
      };
    }

    // Find companies by type
    if (req.query.userType) {
      let userTypes = [];
      if (Array.isArray(req.query.userType.split(','))) {
        req.query.userType.split(',').forEach(function (type) {
          userTypes.push(type.trim());
        });
      } else {
        userTypes = [req.query.userType.split(',')];
      }
      console.log(userTypes);
      searchQueries = {
        ...searchQueries,
        userType: {
          $in: userTypes,
        },
      };
    }

    // Other search criteria

    let filter = [
      { $match: searchQueries },
    ];

    const totalDocs = await User.aggregate(filter);

    let pagination = {};

    const pageCount = Math.ceil(totalDocs.length / limit);

    // next page
    if (endPage < totalDocs.length) {
      pagination.next = {
        next: page + 1,
        limit: limit
      }
    }
    // previous page
    if (startPage > 0) {
      pagination.previous = {
        previous: page - 1,
        limit: limit
      }
    }

    const companies = await User.aggregate(filter).skip(startPage).limit(limit);
    res.status(200).json({ pages: pageCount, count: totalDocs.length, pagination, data: companies })
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = { registerUser, getUserByID, updateUser, deleteUser, listUser };

