/*
  Warnings:

  - You are about to drop the column `updated_at` on the `NoteWidget` table. All the data in the column will be lost.
  - Made the column `birthday` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NoteWidget" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthday" SET NOT NULL;
