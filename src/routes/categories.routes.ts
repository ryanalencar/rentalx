import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/category/createCategory';
import importCategoryController from '../modules/cars/useCases/category/importCategory';
import listCategoriesController from '../modules/cars/useCases/category/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (req, res) =>
  listCategoriesController().handle(req, res),
);

categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoryController().handle(req, res),
);

export { categoriesRoutes };
