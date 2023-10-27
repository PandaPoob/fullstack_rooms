/*
  Warnings:

  - You are about to drop the column `visisted_at` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "visisted_at",
ADD COLUMN     "visited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
