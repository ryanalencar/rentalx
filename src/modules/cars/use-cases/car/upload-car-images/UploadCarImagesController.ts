import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { statusCode } from '@utils/statusCode';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(statusCode.created).send();
  }
}
