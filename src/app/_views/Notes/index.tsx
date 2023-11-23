import { NoteItem } from "@prisma/client";
import NoteList from "../Notes/NoteList";
interface NotesViewProps {
  notes: NoteItem[];
  roomId: string;
}

function NotesView(props: NotesViewProps) {
  return (
    <main>
      <NoteList notes={props.notes} roomId={props.roomId} />
    </main>
  );
}
export default NotesView;
