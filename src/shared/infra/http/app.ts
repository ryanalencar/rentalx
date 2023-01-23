import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';
import { createConnection } from '../typeorm';
import { handleErrors } from './middlewares/handleErrors';

import '@shared/container';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(handleErrors);

export { app };
