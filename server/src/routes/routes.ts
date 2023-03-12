import swaggerUI from 'swagger-ui-express';

import auth from './auth/auth';
import account from './account/account';
import category from './category/category';
import transaction from './transaction/transaction';
import { swaggerSpecs } from './swagger';
import { Request, Response } from 'express';

const express = require('express');
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('<a href="/api-docs">Api Documents</a>');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

//routes
app.use('/api/auth', auth);
app.use('/api/account', account);
app.use('/api/category', category);
app.use('/api/transaction', transaction);

export default app;
