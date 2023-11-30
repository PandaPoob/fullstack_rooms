"use client";
import { User } from "next-auth";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import NoteCard from "../Notes/NoteCard";
import NoteList from "../Notes/NoteList";
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

function NoteView(props: NoteProps) {
  function setSuccess(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  function setErrorMsg(msg: any) {
    throw new Error("Function not implemented.");
  }

  // Liste af notes ind i et react state
  // Hvis resp = ok -> opdater state med old state + newnote
  // Find inspiration: edit user form. Hvis ikke den dukker op, så find i repo: https://github.com/PandaPoob/fullstack_rooms/blob/develop/src/app/_components/forms/EditUserForm.tsx

  return (
    <main>
      {/* <DigitalClock title={`Welcome, ${props.room.title}`} /> */}

      {/* Breadcrumb, skal udvikles ordentligt */}
      <div className="mt-8">
        <li className="flex gap-2 text-sm text-white opacity-80">
          <Link href={"/rooms"}>
            <ul>Room Name</ul> {/* skal mappes, så room name er displayed */}
          </Link>
          <ul className="font-medium">/ All Notes</ul>
        </li>
        <h1 className="text-h1 mt-4">All notes</h1>
      </div>

      {/* Filter */}
      {/* Button - Create new note */}
      <Link className="flex justify-end" href={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"
          />
          <path
            fill="currentColor"
            d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38ZM399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0Z"
          />
        </svg>
      </Link>

      <NoteList notes={props.notes} />

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
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <span>Create Note</span>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
export default NoteView;
