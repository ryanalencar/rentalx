import { Router } from 'express';

import { CreateCarSpecificationController } from '@modules/cars/useCases/car/create-car-specification/CreateCarSpecificationController';
import { CreateCarController } from '@modules/cars/useCases/car/create-car/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/car/list-available-cars/ListAvailableCarsController';

import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/', isAuthenticated, isAdmin, createCarController.handle);
carsRoutes.post(
  '/specifications/:id',
  isAuthenticated,
  isAdmin,
  createCarSpecificationController.handle,
);

export { carsRoutes };
