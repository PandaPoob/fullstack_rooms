import { User } from "next-auth";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import NoteCard from "../Notes/NoteCard";

import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";

interface Roomprops {
  room: Room;
  note: NoteItem;
  sessionUser: User;
}

function RoomView(props: Roomprops) {

  // rooms/id/notes/note_widget_fk

  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>content here</div>
      <Link href={`/room/${props.note.id}`}>notes</Link>
      {/* <NoteCard
        title="Your Note Title"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        vestibulum ......."
        created_at="March 25, 2023"
      /> */}
    </div>
  );
}

export default RoomView;
