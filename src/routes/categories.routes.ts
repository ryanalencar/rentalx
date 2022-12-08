import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/category/createCategory';
import { ImportCategoryController } from '../modules/cars/useCases/category/importCategory';
import { ListCategoriesController } from '../modules/cars/useCases/category/listCategories';

const categoriesRoutes = Router();

const upload = multer({
  dest: './temp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
