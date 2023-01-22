import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { statusCode } from '../../../../utils';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: user.id, avatar_file });

    return response.status(statusCode.noContent).send();
  }
}
