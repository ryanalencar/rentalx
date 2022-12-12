import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUserUseCase = container.resolve(
        AuthenticateUserUseCase,
      );

      const authenticateResponse = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.status(201).json(authenticateResponse);
    } catch (error) {
      return response.status(400).send(error);
    }
  }
}

export { AuthenticateUserController };
