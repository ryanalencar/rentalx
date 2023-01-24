import { Router } from 'express';
import multer from 'multer';

import { uploadConfig } from '@config/upload';
import { CreateUserController } from '@modules/accounts/use-cases/createUser/CreateUserController';
import { ProfileUserController } from '@modules/accounts/use-cases/profile-user/ProfileUserController';
import { UpdateUserAvatarController } from '@modules/accounts/use-cases/updateUserAvatar/UpdateUserAvatarController';
import { isAuthenticated } from '@shared/infra/http/middlewares/isAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.use(isAuthenticated);

usersRoutes.get('/', profileUserController.handle);
usersRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateUserController.handle,
);

export { usersRoutes };
