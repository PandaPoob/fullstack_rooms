import { User } from "next-auth";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import Link from "next/link";
import NoteCard from "../Notes/NoteCard";
import Notes from "../Notes";

interface Roomprops {
  room: Room;
  notes?: any;
  sessionUser: User;
}

function RoomView(props: Roomprops) {
  // rooms/id/notes/note_widget_fk
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>
      <Link href={`/notes/${props.notes.id}`}>
        {props.notes.noteItem && <NoteCard id={props.notes.noteItem[0].id} title={props.notes.noteItem[0].title} text={props.notes.noteItem[0].text} created_at={props.notes.noteItem[0].created_at} updated_at={props.notes.noteItem[0].updated_at} note_widget_fk={props.notes.id}  />}
      </Link>
    </div>
  );
}

export default RoomView;
