import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/use-cases/create-rental/CreateRentalController';

import { isAuthenticated } from '../middlewares/isAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post('/', isAuthenticated, createRentalController.handle);

export { rentalRoutes };
