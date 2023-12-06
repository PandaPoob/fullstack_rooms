"use client";
import { User } from "next-auth";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { NoteItem, NoteWidget, Room } from "@prisma/client";
import NoteCard from "./NoteCard";
import NoteList from "./NoteList";
import Link from "next/link";
import DigitalClock from "@/app/_components/layout/DigitalClock";
import { CreateNoteForm } from "@/app/_models/notes";
import { SetStateAction, useEffect, useState } from "react";

interface NoteProps {
  notes: Notes;
  sessionUser: User;
}

interface Notes {
  title: any;
  id: string;
  room_fk: string;
  updated_at: Date;
  noteItem: NoteItem[];
}
// Breadcrumb
// Create Note
// Note list

function NotesView(props: NoteProps) {
  const [notes, setNotes] = useState<NoteItem[]>(props.notes.noteItem);
  function setSuccess(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

  function setErrorMsg(msg: any) {
    throw new Error("Function not implemented.");
  }

  const [format, setFormat] = useState("");
  const handleFormatClick = (formatType: SetStateAction<string>) => {
    if (format === formatType) {
      setFormat(""); // Reset if clicked twice on the same format
    } else {
      setFormat(formatType); // Set the format if not set already
    }
  };

  const [algignment, setAlignment] = useState("");
  const handleAlignmentClick = (alignmentType: SetStateAction<string>) => {
    if (algignment === alignmentType) {
      setAlignment(""); // Reset if clicked twice on the same alignment
    } else {
      setAlignment(alignmentType); // Set the alignment if not set already
    }
  };

  const [dispayForm, setDisplayForm] = useState(false);

  // Handles delete

  const handleDeleteNote = async (id: string) => {
    console.log(`Note deleted with id: ${id}`);
  };

  return (
    <main>
      {/* <DigitalClock title={`Welcome, ${props.room.title}`} /> */}

      {/* Breadcrumb, skal udvikles ordentligt */}
      <div className="mt-8">
        <li className="flex gap-2 text-sm text-white opacity-80">
          <Link href={"/rooms"}>
            <ul>Room Name</ul> {/* skal mappes, så room name er displayed */}
          </Link>
          <ul>
            <button
              onClick={() => setDisplayForm(false)}
              className="font-medium"
            >
              {" "}
              All Notes
            </button>
          </ul>
        </li>
        <h1 className="text-h1 mt-4">
          {dispayForm ? "New Note" : "All Notes"}
        </h1>
      </div>

      {dispayForm && (
        <Formik
          initialValues={{
            title: "",
            text: "",
            note_widget_fk: "clpuagzes0000h9w7gp79y2un",
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
            <Form className="grid gap-3 mt-2" autoComplete="off">
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-h5 rounded-3xl justify-center "
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Save Note</span>
                  )}
                </button>
              </div>
              <div className="bg-primary rounded-md w-full">
                {/* Værktøjslinje */}
                <div className="flex p-2 justify-between border-b border-secondary border-opacity-20 ">
                  <div className="flex gap-6 text-h5 mt-2 mx-4">
                    {/* Bold */}
                    <button
                      type="button"
                      onClick={() => handleFormatClick("bold")}
                      className="bold"
                    >
                      B
                    </button>
                    {/* Italic */}
                    <button
                      type="button"
                      onClick={() => handleFormatClick("italic")}
                      className="italic"
                    >
                      I
                    </button>
                    {/* Underline */}
                    <button
                      type="button"
                      onClick={() => handleFormatClick("underline")}
                      className="underline"
                    >
                      U
                    </button>
                  </div>
                  <div className="flex gap-6 mx-4">
                    {/* Align left */}
                    <button
                      type="button"
                      onClick={() => handleAlignmentClick("left")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M15 4H0V3h15v1ZM6 8H0V7h6v1Zm3 4H0v-1h9v1Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Align center */}
                    <button
                      type="button"
                      onClick={() => handleAlignmentClick("center")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          d="M15 3.5H0m10 4H5m7 4H3"
                        />
                      </svg>
                    </button>

                    {/* Align right */}
                    <button
                      type="button"
                      onClick={() => handleAlignmentClick("right")}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M0 3h15v1H0V3Zm9 4h6v1H9V7Zm-3 4h9v1H6v-1Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Værktøjslinje end */}
                {/* Note Title Field */}
                <div className="bg-primary rounded-md">
                  <div className="flex items-center">
                    <Field
                      type="text"
                      name="title"
                      placeholder="Title ..."
                      className="w-full rounded-md bg-primary text-white focus:outline-none focus:bg-primary-dark p-4 text-2xl mt-2 font-bold placeholder-secondary"
                    />
                  </div>
                  {/* Note Text Field */}
                  <div className="flex items-center">
                    <Field
                      as="textarea"
                      name="text"
                      placeholder="Text ..."
                      rows={4}
                      className={` ${
                        format.includes("bold")
                          ? "font-bold"
                          : format.includes("italic")
                          ? "italic"
                          : format.includes("underline")
                          ? "underline"
                          : "normal"
                      } ${
                        algignment === "left"
                          ? "text-left"
                          : algignment === "center"
                          ? "text-center"
                          : algignment === "right"
                          ? "text-right"
                          : ""
                      } w-full h-96 rounded-md bg-primary text-white focus:outline-none focus:bg-primary-dark p-4 placeholder-secondary`}
                    />
                  </div>
                  {/* Hidden Field for note_widget_fk */}
                  <Field type="hidden" name="note_widget_fk" />
                </div>
                <p className="flex justify-end text-xs text-secondary m-2">
                  March 25, 2023
                </p>
              </div>

              {/* This button works when you press submit and goes back to all notes, but it dosent save the note */}
              {/* <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-h5 rounded-3xl justify-center "
                  onClick={() => setDisplayForm(false)} // Close the form on submit
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Create Note</span>
                  )}
                </button>
              </div> */}
            </Form>
          )}
        </Formik>
      )}

      {!dispayForm && (
        <div className="flex justify-end">
          <button onClick={() => setDisplayForm(true)}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48"
              />
              <path
                fill="currentColor"
                d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38ZM399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0Z"
              />
            </svg>
          </button>
        </div>
      )}

      {!dispayForm && (
        <NoteList notes={props.notes} onDeleteNote={handleDeleteNote} />
      )}
    </main>
  );
}
export default NotesView;
