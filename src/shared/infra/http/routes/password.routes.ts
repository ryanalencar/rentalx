import { Router } from 'express';

import { ResetUserPasswordController } from '@modules/accounts/useCases/reset-user-password/ResetUserPasswordController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/send-forgot-password-mail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetUserPasswordController.handle);

export { passwordRoutes };
