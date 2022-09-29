import { Router } from "express";
import { v4 as uuidV4 } from "uuid";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/categories", (req, res) => {
  const { name, description } = req.body;

  const category = {
    uuid: uuidV4(),
    name,
    description,
    createdAt: new Date(),
  };

  categories.push(category);

  return res.status(201).json(category);
});

export { categoriesRoutes };
