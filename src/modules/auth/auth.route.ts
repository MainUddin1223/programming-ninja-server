import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.route('/sign-up').post(authController.signUp);
export default { authRouter: router };
