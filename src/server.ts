import express from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "reflect-metadata";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333);
