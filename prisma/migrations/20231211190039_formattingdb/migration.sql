/*
  Warnings:

  - Added the required column `created_by_fk` to the `TaskItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NoteItem" ADD COLUMN     "text_format_fk" TEXT,
ADD COLUMN     "title_format_fk" TEXT;

-- AlterTable
ALTER TABLE "TaskItem" ADD COLUMN     "created_by_fk" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT;

-- CreateTable
CREATE TABLE "NoteFormat" (
    "id" TEXT NOT NULL,
    "formatting" TEXT NOT NULL,

    CONSTRAINT "NoteFormat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskItem" ADD CONSTRAINT "TaskItem_created_by_fk_fkey" FOREIGN KEY ("created_by_fk") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteItem" ADD CONSTRAINT "NoteItem_title_format_fk_fkey" FOREIGN KEY ("title_format_fk") REFERENCES "NoteFormat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteItem" ADD CONSTRAINT "NoteItem_text_format_fk_fkey" FOREIGN KEY ("text_format_fk") REFERENCES "NoteFormat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
