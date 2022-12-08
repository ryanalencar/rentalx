import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/specification/createSpecification';
import { listSpecificationsController } from '../modules/cars/useCases/specification/listSpecifications';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);

specificationsRoutes.get('/', (req, res) =>
  listSpecificationsController.handle(req, res),
);

export { specificationsRoutes };
