import { User } from "next-auth";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";
import NoteCard from "../Notes/NoteCard";
import NoteList from "../Notes/NoteList";

interface Roomprops {
  room: Room;
  notes: NoteItem;
  sessionUser: User;
}

interface Notes {
  id: string;
  room_fk: string;
  updated_at: Date;
  noteItem: NoteItem[];
}

function RoomView(props: Roomprops) {
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>

      {/* Show only the latest note here, instead of the entire list */}

      <Link href={`/notes/${props.notes.id}`}>
        {" "}
        <NoteList notes={props.notes} />
      </Link>
    </div>
  );
}

export default RoomView;
