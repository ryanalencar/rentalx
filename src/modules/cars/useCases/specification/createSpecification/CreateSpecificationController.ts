import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEspecificationUseCase } from './CreateEspecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response) {
    try {
      const { name, description } = request.body;

      const createSpecificationUseCase = container.resolve(
        CreateEspecificationUseCase,
      );

      await createSpecificationUseCase.execute({ description, name });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).send(error);
    }
  }
}

export { CreateSpecificationController };
