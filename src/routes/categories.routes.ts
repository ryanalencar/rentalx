import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/category/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  try {
    const { name, description } = req.body;

    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    );

    createCategoryService.execute({ description, name });

    return res.status(201).send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

categoriesRoutes.get("/", (req, res) => {
  const categories = categoriesRepository.list();

  return res.status(201).json(categories);
});

export { categoriesRoutes };
