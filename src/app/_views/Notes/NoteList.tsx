import { NoteItem, NoteWidget } from "@prisma/client";
import NoteCard from "./NoteCard";

interface NoteProps {
  notes: Notes;
}

interface Notes {
  id: string;
  room_fk: string;
  updated_at: Date;
  noteItem: NoteItem[];
}

function NoteList({ notes }: NoteProps) {
  return (
    <div className="py-7 flex flex-col gap-5 justify-center items-center md:flex-wrap md:flex-row">
      {notes.noteItem.map((note) => (
        // <p>{note.title}</p>
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
export default NoteList;
