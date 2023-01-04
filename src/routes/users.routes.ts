import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '../config/upload';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserController.handle,
);

export { usersRoutes };
