"use client";
import { User } from "next-auth";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import NoteCard from "./NoteCard";
import NoteList from "./NoteList";
import Link from "next/link";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import { CreateNoteForm } from "@/app/_models/notes";

interface NoteProps {
  notes: Notes;
  sessionUser: User;
}

interface Notes {
  id: string;
  room_fk: string;
  updated_at: Date;
  noteItem: NoteItem[];
}

function CreateNote(props: NoteProps) {
  function setSuccess(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  function setErrorMsg(msg: any) {
    throw new Error("Function not implemented.");
  }

  <Formik
    initialValues={{
      title: "",
      text: "",
      note_widget_fk: "clp9vwo7c0000j9gmfui1tx1v",
    }}
    onSubmit={async (values: CreateNoteForm, actions) => {
      console.log("Form Values:", values);
      const formval = JSON.stringify({
        title: values.title,
        text: values.text,
        note_widget_fk: values.note_widget_fk,
      });
      const resp = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formval,
      });
      console.log(formval);
      if (resp.ok) {
        const data = await resp.json();
        // const newNote: NoteItem = data;
        // setNotes([...notes, newNote]);
        // actions.resetForm();
      } else {
        const data = await resp.json();
        actions.setSubmitting(false);

        if (data.msg) {
          setErrorMsg(data.msg);
        } else {
          setErrorMsg(data.error[0].message);
        }
      }
    }}
  >
    {({ isSubmitting }) => (
      <Form className="grid gap-3" autoComplete="off">
        <div>
          <label htmlFor="title" className="block">
            Note Title
          </label>
          <Field
            type="text"
            id="title"
            name="title"
            className="w-full px-3 py-2 rounded-md bg-primary"
            placeholder="Enter note title"
          />
        </div>

        <div>
          <label htmlFor="text" className="block">
            Note Text
          </label>
          <Field
            as="textarea"
            id="text"
            name="text"
            className="w-full px-3 py-2 rounded-md bg-primary"
            rows={4}
            placeholder="Enter note text"
          />
        </div>
        <div>
          <Field
            type="text"
            id="note_widget_fk"
            name="note_widget_fk"
            className="hidden"
            placeholder=""
          />
        </div>

        {/* <div>
      <label
        htmlFor="created_at"
        className="block font-semibold text-gray-700"
      >
        Created At
      </label>
      <Field
        type="text" // You can change this to a date picker or suitable input type
        id="created_at"
        name="created_at"
        className="w-full px-3 py-2 border rounded-md focus:outline-none"
        placeholder="Enter created date"
      />
    </div> */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-btn-gradient text-h5 py-4 mx-auto min-w-[14rem] rounded-3xl flex items-center justify-center min-h-[3.13rem]"
        >
          {isSubmitting ? <span>Submitting...</span> : <span>Create Note</span>}
        </button>
      </Form>
    )}
  </Formik>;
}
export default CreateNote;
