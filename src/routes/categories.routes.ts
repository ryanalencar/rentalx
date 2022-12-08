import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/category/createCategory';
import { ImportCategoryController } from '../modules/cars/useCases/category/importCategory';
import listCategoriesController from '../modules/cars/useCases/category/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (req, res) =>
  listCategoriesController().handle(req, res),
);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
