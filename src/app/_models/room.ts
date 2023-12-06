import { Cover, Room } from "@prisma/client";

export interface RoomCreateForm {
  title: string;
  emails: string[] | [];
}

export interface ExtendedRoom extends Room {
  cover?: Cover;
}
