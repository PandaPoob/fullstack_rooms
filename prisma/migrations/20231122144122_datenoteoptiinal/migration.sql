/*
  Warnings:

  - Made the column `created_at` on table `NoteItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `NoteItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NoteItem" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE TEXT;
