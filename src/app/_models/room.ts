import { Cover, Room } from "@prisma/client";
import { ExtendedParticipant } from "./participants";

export interface RoomCreateForm {
  title: string;
  emails: string[] | [];
}

export interface ExtendedRoom extends Room {
  cover?: Cover;
  participants?: ExtendedParticipant[];
}
