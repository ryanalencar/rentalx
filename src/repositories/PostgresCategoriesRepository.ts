import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

class PostgresCategoriesRepository implements ICategoriesRepository {
  list(): Category[] {
    return null;
  }
  create({ description, name }: ICreateCategoryDTO): void {
    console.log(name, description);
    return null;
  }
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
}

export { PostgresCategoriesRepository };
