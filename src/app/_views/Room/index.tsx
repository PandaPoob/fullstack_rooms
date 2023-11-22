import { User } from "next-auth";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import NoteCard from "../Notes/NoteCard";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";

interface Roomprops {
  room: Room;
  notes: NoteItem;
  sessionUser: User;
}

function RoomView(props: Roomprops) {
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>
      <Link href={`/notes/${props.notes.id}`}>
        {" "}
        <NoteCard />
      </Link>
    </div>
  );
}

export default RoomView;
