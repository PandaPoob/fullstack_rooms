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
    <div className="py-7 grid grid-cols-4 gap-5 justify-center items-center">
      {notes.noteItem.map((note) => (
        // <p>{note.title}</p>
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
export default NoteList;
