import { Repository } from 'typeorm';

import { ICreateCategoryDTO } from '@modules/cars/dtos';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Category } from '../entities';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ description, name });
    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name });
    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }
}

export { CategoriesRepository };
