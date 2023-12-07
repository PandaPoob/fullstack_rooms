"use client";
import { NoteItem } from "@prisma/client";
import NoteCard from "./NoteCard";
import Link from "next/link";

interface NoteListProps {
  notes: NoteItem[];
  room_id: string;
}

function NoteList(props: NoteListProps) {
  return (
    <div className="py-7 grid grid-cols-4 gap-5 justify-center items-center">
      {props.notes.map((note: NoteItem) => (
        <Link key={note.id} href={`/rooms/${props.room_id}/notes/${note.id}`}>
          <NoteCard
            title={note.title}
            text={note.text}
            date={note.created_at}
          />
        </Link>
      ))}
    </div>
  );
}
export default NoteList;
