import { NoteItem } from "@prisma/client";
import NoteCard from "./NoteCard";
import Link from "next/link";

interface NoteListProps {
  notes: NoteItem[];
  roomId: string;
}

function NoteList({ notes, roomId }: NoteListProps) {
  //@TODO add correct href

  return (
    <div className="py-7 flex flex-col gap-5 justify-center items-center md:flex-wrap md:flex-row">
      {notes.length === 0 ? (
        <div>no notes</div>
      ) : (
        notes.map((note) => (
          <Link key={note.id} href={`/rooms/${roomId}/notes/${note.id}`}>
            <NoteCard {...note} />
          </Link>
        ))
      )}
    </div>
  );
}
export default NoteList;
