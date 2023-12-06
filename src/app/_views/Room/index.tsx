import { User } from "next-auth";
import { NoteItem, Room } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";
import NoteCard from "../Notes/NoteCard";
import NoteList from "../Notes/NoteList";

interface Roomprops {
  room: Room;
  note?: NoteItem;
  sessionUser: User;
}

interface Notes {
  id: string;
  room_fk: string;
  updated_at: Date;
  noteItem: NoteItem[];
}

function RoomView(props: Roomprops) {
  const { notes } = props;
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>

      {/* Show only the latest note here, instead of the entire list */}
      {/* {latestNote && (
        <Link href={`/notes/${latestNote.id}`}>
          <NoteCard title={latestNote.title} text={latestNote.text} />
        </Link>
      )} */}

      <Link href={`/rooms/${props.room.id}/notes`}>
        <div className="">{props.notes[0].title}</div>
      </Link>
    </div>
  );
}

export default RoomView;
