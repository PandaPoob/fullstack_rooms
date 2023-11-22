import { NoteItem } from "@prisma/client";

export interface Notes {
    id: string;
    room_fk: string;
    updated_at: Date;
    noteItem: NoteItem[];
  }