/*
  Warnings:

  - You are about to drop the `NotesItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotesWidget` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `birthday` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthday",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "NotesItems";

-- DropTable
DROP TABLE "NotesWidget";

-- CreateTable
CREATE TABLE "NoteWidget" (
    "id" TEXT NOT NULL,
    "room_fk" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NoteWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NoteItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "note_widget_fk" TEXT NOT NULL,

    CONSTRAINT "NoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NoteWidget_room_fk_key" ON "NoteWidget"("room_fk");

-- AddForeignKey
ALTER TABLE "NoteWidget" ADD CONSTRAINT "NoteWidget_room_fk_fkey" FOREIGN KEY ("room_fk") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteItem" ADD CONSTRAINT "NoteItem_note_widget_fk_fkey" FOREIGN KEY ("note_widget_fk") REFERENCES "NoteWidget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
