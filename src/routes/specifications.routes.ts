import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/specification/createSpecification';
import { ListSpecificationsController } from '../modules/cars/useCases/specification/listSpecifications';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(isAuthenticated);
specificationsRoutes.post('/', createSpecificationController.handle);
specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
