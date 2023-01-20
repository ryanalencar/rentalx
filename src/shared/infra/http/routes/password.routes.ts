import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/send-forgot-password-mail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export { passwordRoutes };
