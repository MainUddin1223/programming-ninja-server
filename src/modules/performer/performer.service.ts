import { PrismaClient } from '@prisma/client';
import {
  ICreateTest,
  ICurrentStatics,
  IStaticsAcc,
  ITestQuestions,
} from './performer.interface';
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

const getMyQuizTests = async (id: number) => {
  const result = await prisma.test.findMany({
    where: {
      id,
    },
  });
  return result;
};

const getStatics = async (id: number) => {
  const myStatics: any = await prisma.$queryRaw`
    SELECT pro.name, pro.email, ts.score, ts."wrongAnswer", ts."rightAnswer", ct.category
    FROM auth as pro
    LEFT JOIN test as ts ON pro.id = ts."userId"
    RIGHT JOIN category as ct ON ts."categoryId" = ct.id
    WHERE pro.id = ${id}
    `;
  const statics = myStatics.reduce(
    (acc: IStaticsAcc, current: ICurrentStatics) => {
      const { name, email, score, wrongAnswer, rightAnswer, category } =
        current;
      if (!acc['category'].includes(category)) {
        acc['category'].push(category);
      }
      acc['totalScore'] += Number(score);
      acc['name'] = name;
      acc['email'] = email;
      acc['totalRightAnswer'] += Number(rightAnswer);
      acc['totalWrongAnswer'] += Number(wrongAnswer);
      acc['totalTest'] += 1;
      return acc;
    },
    {
      totalScore: 0,
      totalRightAnswer: 0,
      totalWrongAnswer: 0,
      name: '',
      email: '',
      category: [],
      totalTest: 0,
    }
  );

  const myQuizTests = await prisma.test.findMany({
    where: {
      userId: id,
    },
    select: {
      score: true,
      wrongAnswer: true,
      rightAnswer: true,
      category: {
        select: {
          category: true,
        },
      },
      question: {
        select: {
          quizId: true,
          options: true,
          answered: true,
        },
      },
    },
  });

  return { statics, myQuizTests };
};

export const performerService = {
  createQuizTest,
  getMyQuizTests,
  getStatics,
};
