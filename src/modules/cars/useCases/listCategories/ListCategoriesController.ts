import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private createCategoryUseCase: ListCategoriesUseCase) { }

  handle(request: Request, response: Response) {
    const allCategories = this.createCategoryUseCase.execute();
    return response.json(allCategories);
  }
}

export { ListCategoriesController };
