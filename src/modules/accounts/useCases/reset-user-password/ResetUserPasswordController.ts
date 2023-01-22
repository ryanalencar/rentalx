import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';

export class ResetUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase,
    );

    await resetUserPasswordUseCase.execute({
      password,
      token: String(token),
    });

    return response.json({});
  }
}
