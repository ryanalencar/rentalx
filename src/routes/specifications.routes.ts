import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/specification/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/specification/listSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) =>
  createSpecificationController.handle(req, res)
);

specificationsRoutes.get("/", (req, res) =>
  listSpecificationsController.handle(req, res)
);

export { specificationsRoutes };
