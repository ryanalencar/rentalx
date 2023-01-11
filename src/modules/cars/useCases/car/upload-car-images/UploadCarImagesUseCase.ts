import { inject, injectable } from 'tsyringe';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { Singletons } from '@shared/container';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject(Singletons.CarsImagesRepository)
    private carsImagesRepository: ICarsImagesRepository,
  ) { }
  async execute({ car_id, images_name }: IRequest): Promise<CarImage> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
