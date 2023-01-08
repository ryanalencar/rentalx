import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/create-car/CreateCarController';

import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.use(isAuthenticated, isAdmin);

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
