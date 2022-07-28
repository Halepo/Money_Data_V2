import * as express from 'express';
require("dotenv").config();
import { Request, Response } from 'express';

import swaggerUI from 'swagger-ui-express';
import { swaggerSpecs } from './shared/swagger';

import auth from './routes/auth';

import { createConn } from './config/database';

createConn()

export const app = express();
const port = process.env.PORT || process.env.API_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//swaggerUI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use('/api/auth', auth);

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Hello guys',
    });
});

app.listen(port, () => {
    console.log('server started at http://localhost:' + port);
});