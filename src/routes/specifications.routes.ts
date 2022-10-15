import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/specification/SpecificationsRepository";
import { CreateEspecificationService } from "../modules/cars/services/CreateEspecificationService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  try {
    const { name, description } = req.body;
    const createSpecificationService = new CreateEspecificationService(
      specificationsRepository
    );

    createSpecificationService.execute({ name, description });
    return res.status(201).send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

export { specificationsRoutes };
