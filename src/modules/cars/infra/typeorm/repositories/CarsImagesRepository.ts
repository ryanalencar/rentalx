import { Repository } from 'typeorm';

import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { AppDataSource } from '@shared/infra/typeorm';

import { CarImage } from '../entities/CarImage';

export class CarsImagesRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }
  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}
