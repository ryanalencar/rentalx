import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos';
import {
  ICarsRepository,
  IFindAvailableParams,
} from '@modules/cars/repositories/ICarsRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Car } from '../entities';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOneBy({ id });
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOneBy({ license_plate });
    return car;
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IFindAvailableParams): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (brand) carsQuery.andWhere('cars.brand = :brand', { brand });
    if (category_id)
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    if (name) carsQuery.andWhere('cars.name = :name', { name });

    const cars = await carsQuery.getMany();

    return cars;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const carInstance = this.repository.create(data);

    const car = await this.repository.save(carInstance);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}
