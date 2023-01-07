import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { Category } from '@modules/cars/infra/typeorm/entities';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });
    this.categories.push(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(
      (_category) => _category.name === name,
    );
    return category;
  }
}
