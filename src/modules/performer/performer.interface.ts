import { QuesType } from '@prisma/client';

export interface ICreateTest {
  userId: number;
  categoryId: number;
}
export interface ITestQuestions {
  quizId: number;
  options: string[];
  testId: number;
  questionType: QuesType;
}
export interface ICurrentStatics {
  name: string;
  email: string;
  score: number;
  wrongAnswer: number;
  rightAnswer: number;
  category: string;
}
export interface IStaticsAcc {
  totalScore: number;
  totalRightAnswer: number;
  totalWrongAnswer: number;
  name: string;
  email: string;
  category: string[];
  totalTest: number;
}
