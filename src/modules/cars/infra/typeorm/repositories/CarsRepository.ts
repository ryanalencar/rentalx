import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { Car } from '../entities';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const carInstance = this.repository.create(data);

    const car = await this.repository.save(carInstance);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.repository.findOneBy({ license_plate });
    return car;
  }
}
