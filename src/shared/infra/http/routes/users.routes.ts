import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateUserController } from '@modules/accounts/use-cases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/use-cases/updateUserAvatar/UpdateUserAvatarController';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./temp/avatar'));

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  isAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserController.handle,
);

export { usersRoutes };
