'use strict';
require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');
const helmet = require('helmet');
const csp = require('helmet-csp');
const toobusy = require('toobusy-js');
const hpp = require('hpp');
const lusca = require('lusca');
//const mongoSanitize = require('mongo-express-sanitize');
const contentType = require('content-type');
const getRawBody = require('raw-body');
const reqres = require('./middleware/reqreslog');
const cors = require('cors')

const auth = require('./routes/auth');
const password = require('./routes/password');
const job = require('./routes/job');
const user = require('./routes/user');
const jobCategory = require('./routes/jobcategory');
const experienceLevel = require('./routes/experience');
const jobLocation = require('./routes/location');
const jobType = require('./routes/jobtype');
const advertisement = require('./routes/advertisement');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// Set request size limits
app.use(function (req, res, next) {
  next();

  /*
  if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
    next()
    return
  }

  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1kb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    if (err) return next(err)
    req.text = string
    next()
  })
  */


});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1kb' })); // body parser defaults to a body size limit of 1kb


//app.use(mongoSanitize());

app.use(function (req, res, next) {
  res.setHeader(
    'Report-To',
    '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"https://<server_ip>:<port>/__cspreport__"}],"include_subdomains":true}'
  );
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});

// Helps prevent HTTP parameter pollution
app.use(hpp());

app.use(helmet());
app.use(lusca({
  xframe: 'SAMEORIGIN',
  //p3p: 'ABCDEF',
  xssProtection: true
}));

// Monitor the event loop for heavy traffic
app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, "Server Too Busy");
  } else {
    next();
  }
});

//Every request response logging
app.use(reqres);

app.use(morgan("dev"));
app.use(cors());


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:4001",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/api/auth', auth);
app.use('/api/password', password);
app.use('/api/jobs', job);
app.use('/api/user', user);
app.use('/api/category', jobCategory);
app.use('/api/experience', experienceLevel);
app.use('/api/location', jobLocation);
app.use('/api/jobtype', jobType);
app.use('/api/advertisement', advertisement);




app.listen(port, () => {
  console.log('Server running on port', port);
})