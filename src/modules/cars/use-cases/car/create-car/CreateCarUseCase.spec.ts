import { AppError } from '@shared/errors/AppError';
import { makeCar } from '@test/factories/car-factory';
import { CarsRepositoryInMemory } from '@test/repositories/CarsRepositoryInMemory';
import { statusCode } from '@utils/statusCode';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = makeCar();

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar).toMatchObject(car);
  });

  it('should not be able to create a new car with existing license plate', async () => {
    const car = makeCar();

    await createCarUseCase.execute(car);

    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError('Car already exists', statusCode.conflict),
    );
  });

  it('should be able to create a car with available true by default', async () => {
    const car = makeCar();

    const createdCar = await createCarUseCase.execute(car);

    expect(createdCar.available).toBeTruthy();
  });
});
