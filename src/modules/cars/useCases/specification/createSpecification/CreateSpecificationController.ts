import { Request, Response } from 'express';

import { CreateEspecificationUseCase } from './CreateEspecificationUseCase';

class CreateSpecificationController {
  constructor(
    private createSpecificationUseCase: CreateEspecificationUseCase,
  ) { }

  handle(request: Request, response: Response) {
    try {
      const { name, description } = request.body;

      this.createSpecificationUseCase.execute({ description, name });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).send(error);
    }
  }
}

export { CreateSpecificationController };
