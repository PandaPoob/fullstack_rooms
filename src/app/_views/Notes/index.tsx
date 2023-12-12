"use client";
import { Field, Form, Formik } from "formik";
import { NoteItem } from "@prisma/client";
import NoteList from "./NoteList";
import Link from "next/link";
import { CreateNoteForm } from "@/app/_models/notes";
import { SetStateAction, useState } from "react";
import ErrorToast from "@/app/_components/toasts/ErrorToast";
import { useRouter } from "next/navigation";

interface NotesProps {
  notes: NoteItem[];
  room_id: string;
  noteWidgetId: string;
}

function Notes(props: NotesProps) {
  const router = useRouter();

  // Display form
  const [displayForm, setDisplayForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const clearError = () => {
    setErrorMsg("");
  };

  const [textFormat, setTextFormat] = useState("");
  const [titleFormat, setTitleFormat] = useState("");

  const [isTitle, setIsTitle] = useState(true); // On click på input felt, som sætter state
  // Title is true (da det er først)

  // Text format
  const handleTextFormatClick = (formatType: string) => {
    if (textFormat === formatType) {
      setTextFormat(""); // Reset if clicked twice on the same format
    } else {
      setTextFormat(formatType);
    }
  };

  // Title format
  const handleTitleFormatClick = (formatType: string) => {
    if (titleFormat === formatType) {
      setTitleFormat(""); // Reset if clicked twice on the same format
    } else {
      setTitleFormat(formatType);
    }
  };

  // Alignment
  // const [algignment, setAlignment] = useState("");
  // const handleAlignmentClick = (alignmentType: SetStateAction<string>) => {
  //   if (algignment === alignmentType) {
  //     setAlignment(""); // Reset if clicked twice on the same alignment
  //   } else {
  //     setAlignment(alignmentType); // Set the alignment if not set already
  //   }
  // };

  // Text Alignment
  const [textAlignment, setTextAlignment] = useState("");

  const handleTextAlignmentClick = (alignmentType: string) => {
    if (textAlignment === alignmentType) {
      setTextAlignment(""); // Reset if clicked twice on the same alignment
    } else {
      setTextAlignment(alignmentType); // Set the alignment if not set already
    }
  };

  // Title Alignment
  const [titleAlignment, setTitleAlignment] = useState("");

  const handleTitleAlignmentClick = (alignmentType: string) => {
    if (titleAlignment === alignmentType) {
      setTitleAlignment(""); // Reset if clicked twice on the same alignment
    } else {
      setTitleAlignment(alignmentType); // Set the alignment if not set already
    }
  };

  return (
    <div>
      {/* Breadcrumb, skal udvikles ordentligt */}
      <div className="mt-8">
        <li className="flex gap-2 text-sm  opacity-80">
          <Link href={`/rooms/${props.room_id}`}>
            <ul className="text-secondary hover:text-white ease-in">
              {props.room_id}
            </ul>
          </Link>
          <ul>/</ul>
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
          {displayForm ? "New Note" : "All Notes"}
        </h1>
      </div>

      {displayForm && (
        <>
          <Formik
            initialValues={{
              title: "",
              text: "",
              note_widget_fk: props.noteWidgetId,
            }}
            onSubmit={async (values: CreateNoteForm, actions) => {
              const formval = JSON.stringify({
                title: values.title,
                text: values.text,
                text_format: textFormat,
                title_format: titleFormat,
                text_alignment: textAlignment,
                title_alignment: titleAlignment,
                note_widget_fk: values.note_widget_fk,
              });
              const resp = await fetch("/api/notes", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: formval,
              });
              if (resp.ok) {
                const data = await resp.json();
                router.push(`/rooms/${props.room_id}/notes/${data.note.id}`);
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
                    {/* Text Format */}
                    <div
                      className={`flex gap-6 text-h5 mt-2 mx-4 ${
                        isTitle ? "hidden" : "block"
                      }`}
                    >
                      {/* Bold */}
                      <button
                        type="button"
                        onClick={() => handleTextFormatClick("bold")}
                        className={`${textFormat.includes("bold") && "bold"}`}
                      >
                        B
                      </button>
                      {/* Italic */}
                      <button
                        type="button"
                        onClick={() => handleTextFormatClick("italic")}
                        className={`${
                          textFormat.includes("italic") && "italic"
                        }`}
                      >
                        I
                      </button>
                      {/* Underline */}
                      <button
                        type="button"
                        onClick={() => handleTextFormatClick("underline")}
                        className={`${
                          textFormat.includes("underline") && "underline"
                        }`}
                      >
                        U
                      </button>
                    </div>
                    {/* Title Format */}
                    <div
                      className={`flex gap-6 text-h5 mt-2 mx-4 ${
                        !isTitle ? "hidden" : "block"
                      }`}
                    >
                      {/* Bold */}
                      <button
                        type="button"
                        onClick={() => handleTitleFormatClick("bold")}
                        className={`${textFormat.includes("bold") && "bold"}`}
                      >
                        B
                      </button>
                      {/* Italic */}
                      <button
                        type="button"
                        onClick={() => handleTitleFormatClick("italic")}
                        className={`${
                          textFormat.includes("italic") && "italic"
                        }`}
                      >
                        I
                      </button>
                      {/* Underline */}
                      <button
                        type="button"
                        onClick={() => handleTitleFormatClick("underline")}
                        className={`${
                          textFormat.includes("underline") && "underline"
                        }`}
                      >
                        U
                      </button>
                    </div>
                    {/* Title Alignment */}
                    <div
                      className={`flex gap-6 mx-4 ${
                        !isTitle ? "block" : "hidden"
                      }`}
                    >
                      {/* Align left */}
                      <button
                        type="button"
                        onClick={() => handleTitleAlignmentClick("left")}
                        className={
                          titleAlignment.includes("left") ? "left" : ""
                        }
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
                            fillRule="evenodd"
                            d="M15 4H0V3h15v1ZM6 8H0V7h6v1Zm3 4H0v-1h9v1Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Align center */}
                      <button
                        type="button"
                        onClick={() => handleTitleAlignmentClick("center")}
                        className={
                          titleAlignment.includes("center") ? "center" : ""
                        }
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
                        onClick={() => handleTitleAlignmentClick("right")}
                        className={
                          titleAlignment.includes("right") ? "right" : ""
                        }
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
                            fillRule="evenodd"
                            d="M0 3h15v1H0V3Zm9 4h6v1H9V7Zm-3 4h9v1H6v-1Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* Text Alignment */}
                    <div
                      className={`flex gap-6 mx-4 ${
                        isTitle ? "block" : "hidden"
                      }`}
                    >
                      {/* Align left */}
                      <button
                        type="button"
                        onClick={() => handleTextAlignmentClick("left")}
                        className={textAlignment.includes("left") ? "left" : ""}
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
                            fillRule="evenodd"
                            d="M15 4H0V3h15v1ZM6 8H0V7h6v1Zm3 4H0v-1h9v1Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Align center */}
                      <button
                        type="button"
                        onClick={() => handleTextAlignmentClick("center")}
                        className={
                          textAlignment.includes("center") ? "center" : ""
                        }
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
                        onClick={() => handleTextAlignmentClick("right")}
                        className={
                          textAlignment.includes("right") ? "right" : ""
                        }
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
                            fillRule="evenodd"
                            d="M0 3h15v1H0V3Zm9 4h6v1H9V7Zm-3 4h9v1H6v-1Z"
                            clipRule="evenodd"
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
                        className={`w-full rounded-md bg-primary bg text-white focus:outline-none focus:bg-primary-dark p-4 text-2xl mt-2 font-bold placeholder-secondary ${
                          titleFormat.includes("bold") ? "bold" : ""
                        } ${titleFormat.includes("italic") ? "italic" : ""} ${
                          titleFormat.includes("underline") ? "underline" : ""
                        } ${
                          titleAlignment === "left"
                            ? "text-left"
                            : titleAlignment === "center"
                            ? "text-center"
                            : titleAlignment === "right"
                            ? "text-right"
                            : ""
                        }`}
                        onClick={() => setIsTitle(true)}
                      />
                    </div>
                    {/* Note Text Field */}
                    <div className="flex items-center">
                      <Field
                        as="textarea" // Change the type attribute to as="textarea"
                        name="text"
                        placeholder="Text ..."
                        rows={4}
                        className={`${
                          textFormat.includes("bold")
                            ? "font-bold"
                            : textFormat.includes("italic")
                            ? "italic"
                            : textFormat.includes("underline")
                            ? "underline"
                            : "normal"
                        }
                        ${
                          textAlignment.includes("left")
                            ? "text-left"
                            : textAlignment.includes("center")
                            ? "text-center"
                            : textAlignment.includes("right")
                            ? "text-right"
                            : "normal"
                        } w-full h-96 rounded-md bg-primary text-white focus:outline-none focus:bg-primary-dark p-4 placeholder-secondary `}
                        onClick={() => setIsTitle(false)}
                      />
                    </div>
                    {/* Hidden Field for note_widget_fk */}
                    <Field type="hidden" name="note_widget_fk" />
                  </div>
                  <p className="flex justify-end text-xs text-secondary m-2">
                    March 25, 2023
                  </p>
                </div>
              </Form>
            )}
          </Formik>
          <ErrorToast msg={errorMsg} onDismiss={clearError} />
        </>
      )}

      {!displayForm && (
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

      {!displayForm && <NoteList notes={props.notes} room_id={props.room_id} />}
    </div>
  );
}

export default Notes;
