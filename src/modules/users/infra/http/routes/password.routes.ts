import { Router } from 'express';

import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController';
import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/reset', resetPasswordController.create);

passwordRouter.post('/forgot', forgotPasswordController.create);

export default passwordRouter;
