import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/use-cases/create-rental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/use-cases/devolution-rental/DevolutionRentalController';

import { isAuthenticated } from '../middlewares/isAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.use(isAuthenticated);

rentalRoutes.post('/', createRentalController.handle);
rentalRoutes.post('/devolution/:id', devolutionRentalController.handle);

export { rentalRoutes };
