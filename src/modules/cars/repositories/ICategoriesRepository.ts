import { ICreateCategoryDTO } from '../dtos';
import { Category } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository };
