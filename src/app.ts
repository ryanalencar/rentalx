import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { createConnection } from './database';
import { handleErrors } from './middlewares/handleErrors';
import { router } from './routes';
import swaggerFile from './swagger.json';

import 'express-async-errors';
import 'reflect-metadata';
import './shared/container';

createConnection();

const app = express();

app.use(express.json());
app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(handleErrors);

export { app };
