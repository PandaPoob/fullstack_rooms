-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "visisted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "cover_img" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dceom4kf4/image/upload/v1697656225/default_room_cover_nbbfmg.png';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "location" DROP NOT NULL;
