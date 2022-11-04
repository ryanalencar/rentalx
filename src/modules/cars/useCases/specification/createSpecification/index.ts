import { SpecificationsRepository } from "../../../repositories/implementations/SpecificationsRepository";
import { CreateEspecificationUseCase } from "./CreateEspecificationUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationsRepository = SpecificationsRepository.getInstance();

const createSpecificationUseCase = new CreateEspecificationUseCase(
  specificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
