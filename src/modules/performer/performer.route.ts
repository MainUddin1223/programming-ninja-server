import express from 'express';
import { verifyPerformer } from '../../utils/jwtHelpers/verifyAuth';
import { performerController } from './performer.controller';

const router = express.Router();

router
  .route('/request-test/:id')
  .post(verifyPerformer, performerController.createQuizTest);

export default { performerRouter: router };
