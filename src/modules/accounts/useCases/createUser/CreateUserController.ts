import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, username, email, password, driver_license } = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute({
        name,
        username,
        email,
        password,
        driver_license,
      });

      return response.status(201).send();
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  }
}

export { CreateUserController };
