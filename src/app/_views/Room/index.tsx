import { User } from "next-auth";
import { NoteItem, Room } from "@prisma/client";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import NotesWidget from "./widgets/Notes";

interface Roomprops {
  room: Room;
  note?: NoteItem;
  sessionUser: User;
}

function RoomView(props: Roomprops) {
  return (
    <div>
      <DigitalClock title={`Welcome, ${props.room.title}`} />
      <div>Dashboard content here</div>
      <NotesWidget noteData={props.note} roomId={props.room.id} />
    </div>
  );
}

export default RoomView;
