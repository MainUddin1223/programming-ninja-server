import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/responseHandler/sendResponse';
import { signUpSchema } from './auth.validator';
import { StatusCodes } from 'http-status-codes';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { error } = await signUpSchema.validate(req.body);

  if (error) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_ACCEPTABLE,
      success: false,
      message: error.details[0]?.message,
      data: error.details,
    });
  } else if (req.body?.password !== req.body?.confirmPassword) {
    sendResponse(res, {
      statusCode: StatusCodes.NOT_ACCEPTABLE,
      success: false,
      message: 'Confirm password not matched',
      data: 'Confirm password not matched',
    });
  } else {
    delete req.body.confirmPassword;
    const result = await authService.signUp(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Successfully logged in',
      data: result,
    });
  }
});

export const authController = {
  signUp,
};
