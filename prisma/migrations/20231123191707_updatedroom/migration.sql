/*
  Warnings:

  - You are about to drop the column `cover_img` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coverId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "cover_img",
DROP COLUMN "location",
ADD COLUMN     "coverId" TEXT,
ADD COLUMN     "locationId" TEXT;

-- CreateTable
CREATE TABLE "Cover" (
    "id" TEXT NOT NULL,
    "formattedUrl" TEXT NOT NULL,
    "cloudinaryPublicId" TEXT NOT NULL,

    CONSTRAINT "Cover_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "state" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("latitude","longitude")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Room_coverId_key" ON "Room"("coverId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_coverId_fkey" FOREIGN KEY ("coverId") REFERENCES "Cover"("id") ON DELETE SET NULL ON UPDATE CASCADE;
