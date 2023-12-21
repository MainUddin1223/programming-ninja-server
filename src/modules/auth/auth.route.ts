import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.route('/text').get(authController.test);
export default { authRouter: router };
