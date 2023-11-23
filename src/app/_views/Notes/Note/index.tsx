import { NoteItem } from "@prisma/client";

interface NoteProps {
  data: {
    noteItem: NoteItem;
  };
}

function Note(props: NoteProps) {
  return <div>{props.data.noteItem.title}</div>;
}

export default Note;
