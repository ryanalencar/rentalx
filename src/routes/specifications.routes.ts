import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) =>
  createSpecificationController.handle(req, res)
);

specificationsRoutes.get("/", (req, res) => { });

export { specificationsRoutes };
