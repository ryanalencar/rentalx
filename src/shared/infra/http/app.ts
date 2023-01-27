import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { uploadConfig } from '@config/upload';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';
import { createConnection } from '../typeorm';
import { handleErrors } from './middlewares/handleErrors';
import { rateLimiter } from './middlewares/rateLimiter';

import '@shared/container';
import { statusCode } from '@utils/statusCode';

createConnection();

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`));
app.use('/cars', express.static(`${uploadConfig.tmpFolder}/car-images`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use(handleErrors);

export { app };
