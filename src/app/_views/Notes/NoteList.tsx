import { NoteItem, NoteWidget } from "@prisma/client";
import NoteCard from "./NoteCard";

interface NoteProps {
  notes: Notes;
  onDeleteNote: (id: string) => void; // Function to handle delete action
}

interface Notes {
  id: string;
  room_fk: string;
  updated_at: Date;
  noteItem: NoteItem[];
}

function NoteList({ notes, onDeleteNote }: NoteProps) {
  const handleDelete = (id: string) => {
    onDeleteNote(id);
  };
  return (
    <div className="py-7 grid grid-cols-4 gap-5 justify-center items-center">
      {notes.noteItem.map((note) => (
        // <p>{note.title}</p>
        <NoteCard onDelete={handleDelete} key={note.id} {...note} />
      ))}
    </div>
  );
}
export default NoteList;
