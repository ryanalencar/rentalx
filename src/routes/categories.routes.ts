import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/category/createCategory';
import importCategoryController from '../modules/cars/useCases/category/importCategory';
import listCategoriesController from '../modules/cars/useCases/category/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './temp',
});

categoriesRoutes.post('/', (req, res) =>
  createCategoryController().handle(req, res),
);

categoriesRoutes.get('/', (req, res) =>
  listCategoriesController().handle(req, res),
);

categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoryController().handle(req, res),
);

export { categoriesRoutes };
