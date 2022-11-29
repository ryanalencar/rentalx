import express from "express";
import swaggerUi from "swagger-ui-express";

import { Database } from "./database/config";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "reflect-metadata";

Database.initialize()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333);
