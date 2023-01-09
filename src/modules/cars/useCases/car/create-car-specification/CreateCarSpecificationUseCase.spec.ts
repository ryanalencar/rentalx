import { AppError } from '@shared/errors/AppError';
import { makeCar } from '@test/factories/car-factory';
import { CarsRepositoryInMemory } from '@test/repositories/CarsRepositoryInMemory';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    const carsRepository = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
    );
  });

  it('should be able to create a new specification for a car', async () => {
    const car = await carsRepository.create(makeCar());
    const specifications = ['1234'];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications,
    });
  });

  it('should not be able to create a new specification for a non existing car', async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'non-existing-car',
        specifications: ['specification-id'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
