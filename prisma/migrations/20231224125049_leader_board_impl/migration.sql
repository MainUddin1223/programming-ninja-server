-- CreateTable
CREATE TABLE "leaderBoard" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "testCompleted" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaderBoard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "leaderBoard" ADD CONSTRAINT "leaderBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
