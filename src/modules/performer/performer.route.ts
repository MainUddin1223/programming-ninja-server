import express from 'express';
import { verifyPerformer } from '../../utils/jwtHelpers/verifyAuth';
import { performerController } from './performer.controller';

const router = express.Router();

router
  .route('/request-test/:id')
  .post(verifyPerformer, performerController.createQuizTest);
router
  .route('/my-statics')
  .get(verifyPerformer, performerController.getStatics);

export default { performerRouter: router };
