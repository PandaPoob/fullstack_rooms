-- CreateTable
CREATE TABLE "NotesWidget" (
    "id" TEXT NOT NULL,
    "room_fk" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,

    CONSTRAINT "NotesWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotesItems" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotesItems_pkey" PRIMARY KEY ("id")
);
