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
    message: 'Category added successfully',
    data: result,
  });
});
export const performerController = {
  createQuizTest,
  getStatics,
};
