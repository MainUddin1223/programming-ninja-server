import { PrismaClient } from '@prisma/client';
import { ICreateTest, ITestQuestions } from './performer.interface';
import ApiError from '../../utils/errorHandlers/apiError';
import { StatusCodes } from 'http-status-codes';
import { getRandomValues } from './performer.utils';
const prisma = new PrismaClient();

const createQuizTest = async (payload: ICreateTest) => {
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
    include: {
      quiz: true,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Category Not Found');
  }
  const randomQuestions = getRandomValues(isCategoryExist.quiz, 10);
  const result = await prisma.$transaction(async prisma => {
    const quizTest = await prisma.test.create({
      data: {
        userId: payload.userId,
        categoryId: payload.categoryId,
      },
    });
    const testQuestions: ITestQuestions[] = [];
    randomQuestions.forEach(question => {
      const randomOptions = getRandomValues(question.options, 3);
      const optionsWithAnswers = [...question.answer, ...randomOptions];
      const options = getRandomValues(optionsWithAnswers, 4);
      testQuestions.push({
        quizId: question.id,
        options,
        testId: quizTest.id,
        questionType: question.questionType,
      });
    });
    await prisma.question.createMany({
      data: testQuestions,
    });
    return quizTest;
  });
  const getQuizTestQuestions = await prisma.test.findUnique({
    where: {
      id: result.id,
    },
    select: {
      id: true,
      score: true,
      wrongAnswer: true,
      rightAnswer: true,

      question: {
        select: {
          id: true,
          options: true,
          answered: true,
          questionType: true,
        },
      },
    },
  });
  return getQuizTestQuestions;
};

export const performerService = {
  createQuizTest,
};
