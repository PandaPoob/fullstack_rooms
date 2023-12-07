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

async function RoomView(props: Roomprops) {
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>
      <section className="grid grid-cols-4 gap-4">
        <div>
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
        <div>widget 2</div>
        <div>widget 3</div>
        <div>widget 4</div>
      </section>
    </div>
  );
}

export default RoomView;
