'use strict';
require("dotenv").config();
const express = require("express");
const Category = require("../model/jobcategory");

const addCategory = async (req, res, next) => {

  try {

    const data = req.body;

    Category.findOne({
      name: data.name,
    })
      .then((category) => {
        if (category != null) {
          res.status(404).json({
            message: "Category already exists",
          });
          return;
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });

    let category = await new Category({
      name: data.name,
    }).save()

    res.json({ message: "Category added successfully to the database" });
  } catch (err) {
    console.log(err);
  }
}

const updateCategory = (req, res, next) => {
  const user = req.user;

  Category.findOne({
    _id: req.params.id,
  })
    .then((category) => {
      if (category == null) {
        res.status(404).json({
          message: "Category does not exist",
        });
        return;
      }
      const data = req.body;

      // Update category detail ...
      if (data.name) {
        category.name = data.name;
      }

      category
        .save()
        .then(() => {
          res.json({
            message: "Category details updated successfully",
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

const deleteCategory = (req, res, next) => {
  const user = req.user;

  Category.findOneAndDelete({
    _id: req.params.id,
  })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Category does not exist",
        });
        return;
      }
      res.json({
        message: "Category deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

const listCategory = (req, res, next) => {
  const user = req.user;

  Category.find()
    .then((category) => {
      if (category == null) {
        res.status(400).json({
          message: "Category is empty",
        });
        return;
      }
      // return categories
      return res.json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = { addCategory, updateCategory, deleteCategory, listCategory };