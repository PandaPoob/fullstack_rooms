/*
  Warnings:

  - You are about to drop the column `avatar_img` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_img",
ADD COLUMN     "avatarId" TEXT;

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "formattedUrl" TEXT NOT NULL,
    "cloudinaryPublicId" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_avatarId_key" ON "users"("avatarId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;
