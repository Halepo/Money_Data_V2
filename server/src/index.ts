import * as express from 'express';
require("dotenv").config();
const cors = require('cors')
import { Request, Response } from 'express';

import swaggerUI from 'swagger-ui-express';
import { swaggerSpecs } from './shared/swagger';

import auth from './routes/auth/auth';
import account from './routes/account/account';
import expense from './routes/expense/expense';
import income from './routes/income/income';
import category from './routes/category/category';

import { createConn } from './config/database';

createConn()

export const app = express();
const port = process.env.PORT || process.env.API_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//swaggerUI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

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