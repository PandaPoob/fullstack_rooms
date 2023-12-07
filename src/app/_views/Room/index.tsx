import { User } from "next-auth";
import { NoteItem, Room, TaskItem } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";
import NoteCard from "../Notes/NoteCard";
interface Roomprops {
  room: Room;
  sessionUser: User;
  modalParams: { modal: string } | undefined | null;
  taskWidgetId: string;
  tasks?: TaskItem[];
  noteItem?: NoteItem;
}

function RoomView(props: Roomprops) {
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>

      <Link href={`/rooms/${props.room.id}/notes`}>
        {props.noteItem ? (
          <NoteCard
            title={props.noteItem.title}
            text={props.noteItem.text}
            date={props.noteItem.created_at}
          />
        ) : (
          <p className="">No notes yet</p>
        )}
      </Link>
    </div>
  );
}

export default RoomView;
