'use strict';
require("dotenv").config();
const express = require("express");
const Experience = require("../model/experience");

const addExperience = async(req, res, next) => {

    try {

      const data = req.body;
  
      Experience.findOne({
        name: data.name,
      })
        .then((experience) => {
          if (experience != null) {
            res.status(404).json({
              message: "Experience already exists",
            });
            return;
          }
        })
        .catch((err) => {
          res.status(400).json(err);
        });

      
  
      let experience = await new Experience({
        name: data.name,
      }).save()
    
      res.json({ message: "Experience added successfully to the database" });
        } catch (err) {
          console.log(err);
        }
}

const updateExperience = (req, res, next) => {
    const company = req.company;
  
    Experience.findOne({
      _id: req.params.id,
    })
      .then((experience) => {
        if (experience == null) {
          res.status(404).json({
            message: "Experience does not exist",
          });
          return;
        }
        const data = req.body;
  
        // Update experience ...
        if (data.name) {
            experience.name = data.name;
        }
  
        experience
          .save()
          .then(() => {
            res.json({
              message: "Experience details updated successfully",
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

const deleteExperience = (req, res, next) => {
    const company = req.company;

    Experience.findOneAndDelete({
      _id: req.params.id,
    })
      .then((experience) => {
        if (experience === null) {
          res.status(401).json({
            message: "Experience does not exist",
          });
          return;
        }
        res.json({
          message: "Experience deleted successfully",
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  const listExperience = (req, res, next) => {
    const company = req.company;

    Experience.findOne({ })
      .then((experience) => {
        if (experience == null) {
          res.status(400).json({
            message: "experience is empty",
          });
          return;
        }
        res.json(experience);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
}

  module.exports = { addExperience, updateExperience, deleteExperience, listExperience };