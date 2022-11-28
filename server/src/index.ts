import * as express from 'express';
require('dotenv').config();
const cors = require('cors');
import { Request, Response } from 'express';
const cookieParser = require('cookie-parser');

import swaggerUI from 'swagger-ui-express';
import { swaggerSpecs } from './shared/swagger';

import auth from './routes/auth/auth';
import account from './routes/account/account';
import expense from './routes/expense/expense';
import income from './routes/income/income';
import category from './routes/category/category';

import { createConn } from './config/database';

createConn();

export const app = express();
const port = process.env.PORT || process.env.API_PORT;

var whitelist = ['http://localhost:3000']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//swaggerUI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/api/auth', auth);
app.use('/api/account', account);
app.use('/api/expense', expense);
app.use('/api/income', income);
app.use('/api/category', category);

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Hello guys',
  });
});

app.listen(port, () => {
  console.log('server started at http://localhost:' + port);
});
