import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../config/upload';
import { CreateCategoryController } from '../modules/cars/useCases/category/createCategory';
import { ImportCategoryController } from '../modules/cars/useCases/category/importCategory';
import { ListCategoriesController } from '../modules/cars/useCases/category/listCategories';

const categoriesRoutes = Router();

const uploadCategory = multer(uploadConfig.upload('./temp/category'));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  uploadCategory.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
