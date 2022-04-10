'use strict';
const express = require("express");
const JobType = require('../model/jobtype');

const listjobType = async (req, res) => {
    const jobTypes = await JobType.find().sort('jobType');
    res.send(jobTypes);
};

const addjobType = async (req, res) => {

    let jobType = new JobType({ jobType: req.body.jobType });
    jobType = await jobType.save();

    res.send(jobType);
};

module.exports = { listjobType, addjobType };