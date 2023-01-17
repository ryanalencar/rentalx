import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { statusCode } from '@utils/statusCode';

import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

export class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({ id, user_id });

    return response.status(statusCode.ok).json({ rental });
  }
}
