import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category>;
}

export { ICreateCategoryDTO, ICategoriesRepository };
