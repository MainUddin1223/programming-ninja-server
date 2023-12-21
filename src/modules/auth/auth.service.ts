import { ILoginPayload, ISignUpPayload } from './auth.interface';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { jwtToken } from '../../utils/jwtHelpers/jwtToken';
import config from '../../utils/config';

const prisma = new PrismaClient();

const signUp = async (payload: ISignUpPayload) => {
  const { email, password, name } = payload;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const data = {
    email,
    password: hashedPassword,
    name,
  };
  const isExist = await prisma.auth.findFirst({
    where: {
      email,
    },
  });
  if (isExist) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'Already an user exist with this email'
    );
  }
  const result = await prisma.auth.create({
    data,
  });

  const accessData = {
    role: result.role,
    id: result.id,
  };
  const accessToken = await jwtToken.createToken(
    accessData,
    config.jwt_access_secret as string,
    config.expires_in as string
  );
  return {
    accessToken,
    name: result.name,
    email: result.email,
  };
};

const login = async (payload: ILoginPayload) => {
  const { email, password } = payload;
  const isUserExist = await prisma.auth.findFirst({
    where: {
      email,
    },
  });
  if (!isUserExist) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Something went wrong'
    );
  }
  const accessData = {
    role: isUserExist.role,
    id: isUserExist.id,
  };
  const accessToken = await jwtToken.createToken(
    accessData,
    config.jwt_access_secret as string,
    config.expires_in as string
  );
  return {
    accessToken,
    name: isUserExist.name,
    email: isUserExist.email,
  };
};

export const authService = {
  signUp,
  login,
};
