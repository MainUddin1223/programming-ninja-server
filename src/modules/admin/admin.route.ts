import express from 'express';
import { verifyAdmin } from '../../utils/jwtHelpers/verifyAuth';
import { adminController } from './admin.controller';

const router = express.Router();

router.route('/add-category').post(verifyAdmin, adminController.addCategory);
router.route('/add-quiz').post(verifyAdmin, adminController.addQuiz);

export default { adminRouter: router };
