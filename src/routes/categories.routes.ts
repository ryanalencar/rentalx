import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/category/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res)
);

categoriesRoutes.get("/", (req, res) => {
  const categories = categoriesRepository.list();

  return res.status(201).json(categories);
});

export { categoriesRoutes };
