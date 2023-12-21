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
