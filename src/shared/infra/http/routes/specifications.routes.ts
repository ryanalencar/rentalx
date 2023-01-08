import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/specification/createSpecification';
import { ListSpecificationsController } from '@modules/cars/useCases/specification/listSpecifications';

import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(isAuthenticated, isAdmin);

specificationsRoutes.post('/', createSpecificationController.handle);
specificationsRoutes.get('/', listSpecificationsController.handle);

export { specificationsRoutes };
