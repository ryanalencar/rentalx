import { AppError } from '@shared/errors/AppError';
import { makeCategory } from '@test/factories/category-factory';
import { CategoriesRepositoryInMemory } from '@test/repositories/CategoriesRepositoryInMemory';
import { statusCode } from '@utils/statusCode';

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
    const category = makeCategory();

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toEqual(expect.objectContaining(category));
  });

  it('should not be able to create a category with the same name', async () => {
    const category = makeCategory();

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists!', statusCode.conflict),
    );
  });
});
