const express = require("express");
const {isAuthenticated} = require("../middleware/jwtAuth");
const jobController = require("../controller/jobController");

const app = express();

app.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - jobTitle
 *         - jobDetail
 *         - jobCategory
 *       properties:
 *         _id:
 *           type: integer
 *           description: The Auto-generated id of a job
 *         jobTitle:
 *           type: string
 *           description: title of job
 *         jobDetail:
 *           type: string
 *           description: detail of job
 *         jobCategory:
 *           type: integer
 *           description: category of job
 *         salary:
 *           type: integer
 *           description: salary of job
 *         location:
 *           type: integer
 *           description: location of job
 *         createdAt:
 *           type: string
 *           description: timestamp
 *         updatedAt:
 *           type: string
 *           description: time of job update
 *         
 * 
 *         companyId:
 *           type: integer
 *           description: id of company
 *         companyName:
 *           type: string
 *           description: name of job
 *         
 *       example:
 *         _id: 1
 *         companyId: 1
 *         jobTitle: my title
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Jobs
 *    description: jobs posted
 */

// Count Jobs
app.get("/count", jobController.countJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Returns all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: the list of the jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */

// Get a list of Jobs
app.get("/", jobController.listJob);

/**
 * @swagger
 * /api/jobs/6219dcba3d37fd1e99a9261d:
 *   get:
 *     summary: Return job by ID
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: job by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */

// Get Job by ID
app.get("/:id", jobController.getJobByID);

// Add new Job
app.post("/", isAuthenticated, jobController.postJob);

// Update a Job
app.put("/:id", isAuthenticated, jobController.updateJob);

// Delete a Job
app.delete("/:id", isAuthenticated, jobController.deleteJob);

module.exports = app;