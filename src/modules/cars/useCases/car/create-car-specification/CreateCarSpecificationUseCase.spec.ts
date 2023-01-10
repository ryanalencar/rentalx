import { AppError } from '@shared/errors/AppError';
import { makeCar } from '@test/factories/car-factory';
import { makeSpecification } from '@test/factories/specification-factory';
import { CarsRepositoryInMemory } from '@test/repositories/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@test/repositories/SpecificationsRepositoryInMemory';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification for a car', async () => {
    const car = await carsRepositoryInMemory.create(makeCar());
    const specification = await specificationsRepositoryInMemory.create(
      makeSpecification(),
    );

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications).toHaveLength(1);
  });

  it('should not be able to create a new specification for a non existing car', async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'non-existing-car',
        specifications_id: ['specification-id'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
