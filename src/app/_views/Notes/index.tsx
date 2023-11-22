import { User } from "next-auth";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import NoteCard from "../Notes/NoteCard";
import NoteList from "../Notes/NoteList";
import Link from "next/link";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import { Notes } from "@/app/_models/notes";

interface NoteProps {
  notes: Notes;
  sessionUser: User;
}



function NoteView(props: NoteProps) {
  return (
    <main>
      {/* <DigitalClock title={`Welcome, ${props.room.title}`} /> */}
      <div className="">hvorfor kommer dette ikke frem</div>
      <NoteList notes={props.notes} />
      {/* <NoteCard
        title="Your Note Title"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          vestibulum ......."
        created_at="March 25, 2023"
      /> */}
    </main>
  );
}
export default NoteView;
