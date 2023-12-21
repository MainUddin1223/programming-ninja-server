/*
  Warnings:

  - You are about to drop the column `Score` on the `test` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "test" DROP COLUMN "Score",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
