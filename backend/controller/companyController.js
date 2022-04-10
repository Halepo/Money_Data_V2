'use strict';
require("dotenv").config();
const express = require("express");
const nodeMailer = require('../config/nodemailer');
const formateForMail = require('../config/formatformail');
const jwtAuth = require("../middleware/jwtAuth");
const Company = require("../model/company");
const Job = require("../model/job");

const getCompanyByID = (req, res, next) => {
    Company.findOne({ _id: req.params.id })
      .then((company) => {
        if (company == null) {
          res.status(400).json({
            message: "Company does not exist",
          });
          return;
        }
        // return active jobs posted by company


        // return company
        res.json(company);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
}

const updateCompany = (req, res, next) => {
  const company = req.company;

  if (req.params.id != company.company_id && company.role != "admin") {
    res.status(404).json({
        message: "Permission Denied",
      });
      return;
  }

  Company.findOne({
    _id: req.params.id,
  })
    .then((company) => {
      if (company == null) {
        res.status(404).json({
          message: "Company does not exist",
        });
        return;
      }
      const data = req.body;

      // Update company detail ...
      if (data.companyType) {
        company.companyType = data.companyType;
      }

      company
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

const deleteCompany = (req, res, next) => {
  const company = req.company;

  if (req.params.id != company.company_id && company.role != "admin") {
    res.status(404).json({
        message: "Permission Denied",
    });
    return;
  }

  Company.findOneAndDelete({
    _id: req.params.id,
  })
    .then((company) => {
      if (company === null) {
        res.status(401).json({
          message: "Company does not exist",
        });
        return;
      }
      res.json({
        message: "Company deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

const listCompany = async(req, res, next) => {
    try {
    
        let searchQueries = {};

        // Get input
        const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    
        // Pagination
        const startPage = (page -1)*limit;
        const endPage = (page)*limit;

        // find companies by name
        if (req.query.companyName) {
            searchQueries = {
              ...searchQueries,
              name: {
                $regex: new RegExp(req.query.companyName, "i"),
              },
            };
          }
    
        // Find companies by type
        if (req.query.companyType) {
            let companyTypes = [];
            if (Array.isArray(req.query.companyType.split(','))) {
              req.query.companyType.split(',').forEach(function(type){
                companyTypes.push(type.trim());
              });
            } else {
                companyTypes = [req.query.companyType.split(',')];
            }
            console.log(companyTypes);
            searchQueries = {
              ...searchQueries,
              companyType: {
                $in: companyTypes,
              },
            };
        }

        // Other search criteria

        let filter = [
            { $match: searchQueries }, 
          ];

        const totalDocs = await Company.aggregate(filter);
    
        let pagination = {};
      
        const pageCount = Math.ceil(totalDocs.length / limit);
      
        // next page
        if(endPage < totalDocs.length){
            pagination.next = {
              next: page + 1,
              limit:limit
            }
          }
        // previous page
        if(startPage > 0){
            pagination.previous = {
              previous:page - 1,
              limit:limit
            }
        }
      
        const companies = await Company.aggregate(filter).skip(startPage).limit(limit);
        res.status(200).json({pages:pageCount, count:totalDocs.length,pagination,data:companies})
    }
    catch (err) {
        console.log(err);
      }
}

module.exports = { getCompanyByID, updateCompany, deleteCompany, listCompany };

