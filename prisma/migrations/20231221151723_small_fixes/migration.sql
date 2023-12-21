/*
  Warnings:

  - The values [mulitple] on the enum `QuesType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "QuesType_new" AS ENUM ('multiple', 'single');
ALTER TABLE "quiz" ALTER COLUMN "questionType" TYPE "QuesType_new" USING ("questionType"::text::"QuesType_new");
ALTER TYPE "QuesType" RENAME TO "QuesType_old";
ALTER TYPE "QuesType_new" RENAME TO "QuesType";
DROP TYPE "QuesType_old";
COMMIT;

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "options" TEXT[];
