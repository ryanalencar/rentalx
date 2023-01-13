import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { statusCode } from '@utils/statusCode';

import { CreateRentalUseCase } from './CreateRentalUseCase';

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      expected_return_date,
      car_id,
      user_id: id,
    });

    return response.status(statusCode.created).json({ rental });
  }
}
