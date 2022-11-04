import { Router } from "express";
import * as multer from "multer";

import { importCategoryController } from "../modules/cars/useCases/category";
import { createCategoryController } from "../modules/cars/useCases/category/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/category/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./temp",
});

categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res)
);

categoriesRoutes.get("/", (req, res) =>
  listCategoriesController.handle(req, res)
);

categoriesRoutes.post("/import", upload.single("file"), (req, res) =>
  importCategoryController.handle(req, res)
);

export { categoriesRoutes };
