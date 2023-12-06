import { User } from "next-auth";
import { NoteItem, Room } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";
interface Roomprops {
  room: Room;
  noteItem?: NoteItem;
  sessionUser: User;
}

function RoomView(props: Roomprops) {
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>

      <Link href={`/rooms/${props.room.id}/notes`}>
        {props.noteItem ? (
          <div className="">{props.noteItem.title}</div>
        ) : (
          <p className="">No notes yet</p>
        )}
      </Link>
    </div>
  );
}

export default RoomView;
