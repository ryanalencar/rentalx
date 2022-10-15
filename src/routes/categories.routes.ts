import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoryRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

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
    return res.status(400).json({ error: new Error(error) });
  }
});

categoriesRoutes.get("/", (req, res) => {
  const categories = categoriesRepository.list();

  return res.status(201).json(categories);
});

export { categoriesRoutes };
