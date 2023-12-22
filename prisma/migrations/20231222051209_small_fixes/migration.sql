/*
  Warnings:

  - You are about to drop the column `currectAnswer` on the `question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "question" DROP COLUMN "currectAnswer",
ADD COLUMN     "correctAnswer" TEXT[],
ADD COLUMN     "isCorrectAnswer" BOOLEAN NOT NULL DEFAULT false;
