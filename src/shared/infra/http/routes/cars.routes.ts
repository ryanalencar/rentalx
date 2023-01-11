import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateCarSpecificationController } from '@modules/cars/useCases/car/create-car-specification/CreateCarSpecificationController';
import { CreateCarController } from '@modules/cars/useCases/car/create-car/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/car/list-available-cars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/car/upload-car-images/UploadCarImagesController';

import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig.upload('./temp/car-images'));

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.use(isAuthenticated, isAdmin);

carsRoutes.post('/', createCarController.handle);
carsRoutes.post('/specifications/:id', createCarSpecificationController.handle);
carsRoutes.post(
  '/images/:id',
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
