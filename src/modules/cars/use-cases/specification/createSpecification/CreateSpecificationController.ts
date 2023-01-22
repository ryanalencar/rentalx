import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEspecificationUseCase } from './CreateEspecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateEspecificationUseCase,
    );

    const specification = await createSpecificationUseCase.execute({
      description,
      name,
    });

    return response.status(201).json({ specification });
  }
}

export { CreateSpecificationController };
