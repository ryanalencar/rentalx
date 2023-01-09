import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/car/create-car/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/car/list-available-cars/ListAvailableCarsController';

import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/', isAuthenticated, isAdmin, createCarController.handle);

export { carsRoutes };
