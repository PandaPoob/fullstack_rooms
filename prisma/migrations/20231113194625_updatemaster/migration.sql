/*
  Warnings:

  - You are about to drop the column `location` on the `users` table. All the data in the column will be lost.
  - Made the column `avatar_img` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "location",
ALTER COLUMN "avatar_img" SET NOT NULL,
ALTER COLUMN "avatar_img" SET DEFAULT 'https://res.cloudinary.com/dceom4kf4/image/upload/v1699872613/default_avatar_kdobv7.png';
