import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateCategoryController } from '@modules/cars/useCases/category/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/category/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/category/listCategories/ListCategoriesController';

import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const categoriesRoutes = Router();

const uploadCategory = multer(uploadConfig.upload('./temp/category'));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(isAuthenticated, isAdmin);

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post(
  '/import',
  uploadCategory.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
