/*
  Warnings:

  - You are about to drop the column `location` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "location",
ALTER COLUMN "avatar_img" SET DEFAULT 'https://res.cloudinary.com/dceom4kf4/image/upload/v1699872613/default_avatar_kdobv7.png';
