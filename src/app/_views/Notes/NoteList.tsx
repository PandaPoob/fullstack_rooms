import { NoteItem } from "@prisma/client";
import { NoteCard } from "../Notes/NoteCard";

interface NoteProps {
  notes: NoteItem[];
}

function NoteList({ notes }: NoteProps) {
  return (
    <div className="py-7 flex flex-col gap-5 justify-center items-center md:flex-wrap md:flex-row">
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
export default NoteList;
