import NoteCard from "@/app/_views/Notes/NoteCard";
import { NoteItem } from "@prisma/client";
import Link from "next/link";

interface NoteWidgetProps {
  noteData?: NoteItem;
  roomId: string;
}

function NotesWidget(props: NoteWidgetProps) {
  return (
    <div>
      {!props.noteData ? (
        <div>
          No notes
          <Link href={`/rooms/${props.roomId}/notes`}>Create one here</Link>
        </div>
      ) : (
        <div>
          <Link href={`/rooms/${props.roomId}/notes`}>
            <NoteCard {...props.noteData} />
          </Link>
        </div>
      )}
    </div>
  );
}
export default NotesWidget;
