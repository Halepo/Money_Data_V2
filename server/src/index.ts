import * as express from 'express';
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
import routes from './routes/routes';
import { corsOptions } from './config/configurations';

import { createConn } from './config/database';
// TODO create db connection if live in prods
// process.env.ENVIRONMENT === 'prod' ? createConn() : '';

const port = process.env.PORT || process.env.API_PORT;
createConn();

export const app = express();
app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log('server started at http://localhost:' + port);
});

// module.exports.createConn = createConn();
