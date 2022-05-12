//'use strict';
require("dotenv").config();
const express = require("express");
const nodeMailer = require('../config/nodemailer');
const formateForMail = require('../config/formatformail');
const jwtAuth = require("../middleware/jwtAuth");
const User = require("../model/user");
const Job = require("../model/job");
const viewCount = require("../model/viewcount");
const jobCategory = require("../model/jobcategory");
const jobLocation = require("../model/location");

const countJob = async (req, res, next) => {
  try {
    let searchQueries = {};

    // count jobs by category
    if (req.query.jobCategory) {
      let jobCategorys = [];
      if (Array.isArray(req.query.jobCategory.split(','))) {
        req.query.jobCategory.split(',').forEach(function (category) {
          jobCategorys.push(category.trim());
        });
      } else {
        jobCategorys = [req.query.jobCategory.split(',')];
      }
      console.log(jobCategorys);
      searchQueries = {
        ...searchQueries,
        jobCategory: {
          $in: jobCategorys,
        },
      };
    }
    let filter = [
      { $match: searchQueries },
    ];
    const totalDocs = await Job.aggregate(filter);
    res.status(200).json({ count: totalDocs.length })
  }
  catch (err) {
    console.log(err);
  }
}

const listJob = async (req, res, next) => {
  try {

    //const user = req.user;

    let searchQueries = {};
    let sortQuery = {};
    let categoryLookup = {};
    let locationLookup = {};
    let experienceLookup = {};

    // Get input
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    // Pagination
    const startPage = (page - 1) * limit;
    const endPage = (page) * limit;

    // find jobs by user ID
    if (req.query.userId) {
      searchQueries = {
        ...searchQueries,
        userId: req.query.userId,
      };
    }

    // find jobs by user name
    if (req.query.userName) {
      searchQueries = {
        ...searchQueries,
        userName: {
          $regex: new RegExp(req.query.userName, "i"),
        },
      };
    }

    // find jobs by location
    if (req.query.location) {
      locationLookup = {
        ...locationLookup,
        from: "jobcategories",
        let: { locationId: "$location" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$locationId"] },
                  { $eq: ["$name", req.query.location] },
                ],
              },
            },
          },
        ],
        as: "location_info",
      }
    }

    // find jobs by title
    if (req.query.jobTitle) {
      searchQueries = {
        ...searchQueries,
        jobTitle: {
          $regex: new RegExp(req.query.jobTitle, "i"),
        },
      };
    }

    // find jobs by category
    if (req.query.jobCategory) {
      categoryLookup = {
        ...categoryLookup,
        from: "locations",
        let: { categoryId: "$jobCategory" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$categoryId"] },
                  { $eq: ["$name", req.query.jobCategory] },
                ],
              },
            },
          },
        ],
        as: "category_info",
      }
    }

    // find jobs by category
    if (req.query.experience) {
      experienceLookup = {
        ...experienceLookup,
        from: "experiences",
        let: { experienceId: "$experience" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$_id", "$$experienceId"] },
                  { $eq: ["$name", req.query.experience] },
                ],
              },
            },
          },
        ],
        as: "experience_info",
      }
    }

    // find jobs by skill
    if (req.query.skillSet) {
      let skillSets = [];
      if (Array.isArray(req.query.skillSet.split(','))) {
        skillSets = req.query.skillSet.split(',');
      } else {
        skillSets = [req.query.skillSet.split(',')];
      }
      let skillRegexp = [];
      skillSets.forEach(function (skill) {
        // user input into regex Security ??
        skillRegexp.push(new RegExp(skill.trim(), "i"));
      });
      searchQueries = {
        ...searchQueries,
        skillSet: {
          $in: skillRegexp,
        },
      };
    }

    // find jobs by salary
    if (req.query.salaryMin && req.query.salaryMax) {
      searchQueries = {
        ...searchQueries,
        $and: [
          {
            salary: {
              $lte: parseInt(req.query.salaryMax),
            },
          },
          {
            salary: {
              $gte: parseInt(req.query.salaryMin),
            },
          },
        ],
      };
    }
    else if (req.query.salaryMin) {
      searchQueries = {
        ...searchQueries,
        salary: {
          $gte: parseInt(req.query.salaryMin),
        },
      };
    }
    else if (req.query.salaryMax) {
      searchQueries = {
        ...searchQueries,
        salary: {
          $lte: parseInt(req.query.salaryMax),
        },
      };
    }
    console.log(searchQueries);

    // find jobs by keyword
    if (req.query.keyword) {
      searchQueries = {
        ...searchQueries,
        $or: [
          { "jobTitle": new RegExp(req.query.keyword, "i") },
          { "jobDetail": new RegExp(req.query.keyword, "i") }
        ],
      };
    }

    // sort
    if (req.query.asc) {
      if (Array.isArray(req.query.asc.split(','))) {
        req.query.asc.split(',').map((key) => {
          sortQuery = {
            ...sortQuery,
            [key]: 1,
          };
        });
      }
      else {
        sortQuery = {
          ...sortQuery,
          [req.query.asc.split(',')]: 1,
        };
      }
    }

    if (req.query.desc) {
      if (Array.isArray(req.query.desc.split(','))) {
        req.query.desc.split(',').map((key) => {
          sortQuery = {
            ...sortQuery,
            [key]: -1,
          };
        });
      }
      else {
        sortQuery = {
          ...sortQuery,
          [req.query.desc.split(',')]: -1,
        };
      }
    }
    console.log(sortQuery);

    console.log(categoryLookup);

    let filter = [{ $match: searchQueries }];

    if (Object.keys(categoryLookup).length > 0) {
      filter.push({
        $lookup:
          categoryLookup
      });
      filter.push({
        $unwind: "$category_info",
      })
    }

    if (Object.keys(locationLookup).length > 0) {
      filter.push({
        $lookup:
          locationLookup
      });
      filter.push({
        $unwind: "$location_info",
      })
    }

    if (Object.keys(experienceLookup).length > 0) {
      filter.push({
        $lookup:
          experienceLookup
      });
      filter.push({
        $unwind: "$experience_info",
      })
    }

    if (Object.keys(sortQuery).length > 0) {
      filter.push({ $sort: sortQuery })
    }

    const totalDocs = await Job.aggregate(filter);

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

    const jobs = await Job.aggregate(filter).skip(startPage).limit(limit);
    res.status(200).json({ pages: pageCount, count: totalDocs.length, pagination, data: jobs })
  } catch (err) {
    console.log(err);
  }
};

const getJobByID = (req, res, next) => {
  Job.findOne({ _id: req.params.id })
    .then((job) => {
      if (job == null) {
        res.status(400).json({
          message: "Job does not exist",
        });
        return;
      }

      if (!job.uniqueIP.includes(req.ip)) {
        job.uniqueIP.push(req.ip);
        job.viewCount += 1;
        job.save();
      }

      /*viewCount.find({jobId: req.params.id, ip: req.ip}).then((result) => {
        if (result.length == 0) {
          new viewCount({jobId: req.params.id, ip: req.ip}).save();   // add a new visitor for job
          job.viewCount += 1;   // update the counter on the job
          job.save();
        }
      });*/

      res.json(job);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}


const postJob = async (req, res, next) => {

  try {

    const user = req.user;

    // check job post limit is not exceeded
    if (user.role == "basic") {
      var start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);   // subscription date
      var end = new Date(new Date().getFullYear(), new Date().getMonth(), 30);
      let jobsPosted = await Job.find({ userId: user.user_id, advertisedDate: { $gte: start, $lt: end } }).count();

      let jobPostLimit = 10;
      // let subscription = await Subscription.find({ user })
      //let jobPostLimit = await Plan.find({ name: subscription.plan })

      if (jobsPosted >= jobPostLimit) {
        res.status(404).json({
          message: "Job post limit exceeded",
        });
        return;
      }
    }

    const data = req.body;

    let job = await new Job({
      // poster req.user
      userId: user.user_id,
      jobTitle: data.jobTitle,
      jobDetail: data.jobDetail,
      noOfPosition: data.noOfPosition,
      jobCategory: data.jobCategory,
      salary: data.salary,
      location: data.location,
      createdAt: new Date(),
      advertisedDate: data.advertisedDate,
      expireDate: data.expireDate,
      skillSet: data.skillSet,
      postedBy: user.role,
      updatedAt: ""
    }).save()

    //const msg = formateForMail.formateForMail('postJob', job.jobTitle);
    //nodeMailer.nodeMailer(user.email, 'New Job Posted', msg);
    res.json({ message: "Job added successfully to the database" });
  } catch (err) {
    console.log(err);
  }
}

const updateJob = (req, res, next) => {
  const user = req.user;

  // admin

  Job.findOne({
    _id: req.params.id,
    userId: user.user_id,
  })
    .then((job) => {
      if (job == null) {
        res.status(404).json({
          message: "Job does not exist",
        });
        return;
      }
      const data = req.body;
      job.updatedAt = new Date();
      // Update job category
      if (data.jobCategory) {
        job.jobCategory = data.jobCategory;
      }
      // Update job detail
      if (data.jobDetail) {
        job.jobDetail = data.jobDetail;
      }
      // Update no of position
      if (data.noOfPosition) {
        job.noOfPosition = data.noOfPosition;
      }
      // Update job expire date
      if (data.expireDate) {
        job.expireDate = data.expireDate;
      }
      job
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

const deleteJob = (req, res, next) => {
  const user = req.user;

  // admin

  Job.findOneAndDelete({
    _id: req.params.id,
    userId: user.user_id,
  })
    .then((job) => {
      if (job === null) {
        res.status(401).json({
          message: "Job does not exist",
        });
        return;
      }
      res.json({
        message: "Job deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = { countJob, listJob, getJobByID, updateJob, deleteJob, postJob };