export interface CreateNoteForm {
  title: string;
  text: string;
  note_widget_fk: string;
}

export interface EditNote {
  title: string;
  text: string;
  note_widget_fk?: string;
}
