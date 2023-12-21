import { Request, Response } from 'express';
import catchAsync from '../../utils/errorHandlers/catchAsync';
import { authService } from './auth.service';
import sendResponse from '../../utils/responseHandler/sendResponse';

const test = catchAsync(async (req: Request, res: Response) => {
  // const { error } = await signUpSchema.validate(req.body);

  // if (error) {
  //     sendResponse(res, {
  //         statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
  //         success: false,
  //         message: error.details[0]?.message || authResponseMessage.signUpFailed,
  //         data: error.details,
  //     });
  // } else if (req.body?.password !== req.body?.confirmPassword) {
  //     sendResponse(res, {
  //         statusCode: StatusCodes.NON_AUTHORITATIVE_INFORMATION,
  //         success: false,
  //         message: 'Confirm password not matched',
  //         data: 'Confirm password not matched',
  //     });
  // } else {
  //     delete req.body.confirmPassword;
  //     const result = await authService.signUp(req.body);
  //     sendResponse(res, {
  //         statusCode: StatusCodes.OK,
  //         success: true,
  //         message: authResponseMessage.signUpSuccessful,
  //         data: result,
  //     });
  // }
  const result = authService.testApi();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'success',
    data: result,
  });
});

export const authController = {
  test,
};
