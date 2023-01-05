import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@test/repositories/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Test Category',
      description: 'This is a test category',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toEqual(expect.objectContaining(category));
  });

  it('should not be able to create a category with the same name', async () => {
    const category = {
      name: 'Test Category',
      description: 'This is a test category',
    };

    await createCategoryUseCase.execute(category);

    expect(async () => {
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
