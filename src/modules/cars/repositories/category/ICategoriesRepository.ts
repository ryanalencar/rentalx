import { Category } from "../../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  list(): Category[];
  create({ description, name }: ICreateCategoryDTO): void;
  findByName(name: string): Category;
}

export { ICreateCategoryDTO, ICategoriesRepository };
