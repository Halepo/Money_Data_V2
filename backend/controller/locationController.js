'use strict';
require("dotenv").config();
const express = require("express");
const Location = require("../model/location");

const addLocation = async (req, res, next) => {

  try {

    const user = req.user;

    const data = req.body;

    Location.findOne({
      location: data.location,
    })
      .then((location) => {
        if (location != null) {
          res.status(404).json({
            message: "Location already exists",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });

    let location = await new Location({
      location: data.location,
    }).save()

    return res.json({ message: "Location added successfully to the database" });
  } catch (err) {
    console.log(err);
  }
}

const updateLocation = (req, res, next) => {
  const user = req.user;

  Location.findOne({
    _id: req.params.id,
  })
    .then((location) => {
      if (location == null) {
        res.status(404).json({
          message: "Location does not exist",
        });
        return;
      }
      const data = req.body;

      // Update location
      if (data.location) {
        location.name = data.location;
      }

      location
        .save()
        .then(() => {
          res.json({
            message: "Location updated successfully",
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

const deleteLocation = (req, res, next) => {
  const user = req.user;

  Location.findOneAndDelete({
    _id: req.params.id,
  })
    .then((location) => {
      if (location === null) {
        res.status(401).json({
          message: "Location does not exist",
        });
        return;
      }
      res.json({
        message: "Location deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

const listLocation = (req, res, next) => {
  const user = req.user;

  Location.find({})
    .then((location) => {
      if (location == null) {
        res.status(400).json({
          message: "Location is empty",
        });
        return;
      }
      return res.json(location);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = { addLocation, updateLocation, deleteLocation, listLocation };