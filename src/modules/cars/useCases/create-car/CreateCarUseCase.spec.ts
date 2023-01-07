import { AppError } from '@shared/errors/AppError';
import { makeCar } from '@test/factories/car-factory';
import { CarsRepositoryInMemory } from '@test/repositories/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = makeCar();

    await createCarUseCase.execute(car);

    const carCreated = await carsRepository.findByLicensePlate(
      car.license_plate,
    );

    expect(carCreated).toMatchObject(car);
  });

  it('should not be able to create a new car with existing license plate', async () => {
    const car = makeCar();

    await createCarUseCase.execute(car);

    expect(async () => {
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });
});
