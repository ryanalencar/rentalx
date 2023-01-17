import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserRentalsUseCase } from './ListUserRentalsUseCase';

export class ListUserRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase);

    const rentals = await listUserRentalsUseCase.execute({ user_id });

    return response.json({ rentals });
  }
}
