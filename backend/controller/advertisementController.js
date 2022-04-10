'use strict';
const express = require("express");
const Advertisement = require("../model/advertisement");
const Location = require('../model/location');
const JobType = require('../model/jobtype');

// Get all advertisements
const listAdvertisement = async (req, res) => {
    const advertisements = await Advertisement.find().sort('jobTitle');
    res.send(advertisements);
};

// Get advertisement by ID
const getAdvertisementByID = async (req, res) => {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) return res.status(404).send('Advertisement not found.');
    res.send(advertisement);
};

// Add new advertisement
const addAdvertisement = async (req, res) => {

    const location = await Location.findById(req.body.locationId);
    if (!location) return res.status(400).send('Invalid location.');

    const jobType = await JobType.findById(req.body.jobTypeId);
    if (!jobType) return res.status(400).send('Invalid Job Type.');

    const advertisement = new Advertisement({
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobDetail: req.body.jobDetail,
        noOfPosition: req.body.noOfPosition,
        jobType: jobType._id,
        salary: req.body.salary,
        location: location._id,
        email: req.body.email
     });

    advertisement = await advertisement.save();

    res.send(advertisement);
};

// Update advertisement
const updateAdvertisement = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = await Location.findById(req.body.locationId);
    if (!location) return res.status(400).send('Invalid location.');

    const jobType = await JobType.findById(req.body.jobTypeId);
    if (!jobType) return res.status(400).send('Invalid Job Type.');

    const advertisement = await Advertisement.findByIdAndUpdate(req.params.id,
    {
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobDetail: req.body.jobDetail,
        noOfPosition: req.body.noOfPosition,
        jobType: jobType._id,
        salary: req.body.salary,
        location: location._id,
        email: req.body.email
    }, { new: true});

    if (!advertisement) return res.status(404).send('Advertisement not found.');
    res.send(advertisement);
};

// Delete advertisement
const deleteAdvertisement = async (req, res) => {
    const advertisement = await Advertisement.findByIdAndRemove(req.params.id);
    if (!advertisement) return res.status(404).send('Advertisement not found.');
    res.send(advertisement);
};

module.exports = { listAdvertisement, getAdvertisementByID, addAdvertisement, updateAdvertisement, deleteAdvertisement };