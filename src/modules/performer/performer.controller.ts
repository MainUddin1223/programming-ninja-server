import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import sendResponse from '../../utils/responseHandler/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { performerService } from './performer.service';

const createQuizTest = catchAsync(async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);
  const result = await performerService.createQuizTest({
    categoryId: categoryId,
    userId: req.user?.id,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category added successfully',
    data: result,
  });
});
const getStatics = catchAsync(async (req: Request, res: Response) => {
  const result = await performerService.getStatics(req.user?.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully',
    data: result,
  });
});

const verifyAnswer = catchAsync(async (req: Request, res: Response) => {
  const questionId = Number(req.params.id);
  const selectedAnswer = req.body.answer;
  const userId = Number(req.user?.id);
  const result = await performerService.checkAnswer({
    userId,
    questionId,
    selectedAnswer,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Answer verified successfully',
    data: result,
  });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await performerService.getCategories();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});
export const performerController = {
  createQuizTest,
  getStatics,
  verifyAnswer,
  getCategories,
};
