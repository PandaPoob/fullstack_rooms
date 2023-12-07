"use client";
import { EditNote } from "@/app/_models/notes";
import { NoteItem } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import { SetStateAction, useState } from "react";
import ErrorToast from "@/app/_components/toasts/ErrorToast";
import { useRouter } from "next/navigation";

interface NoteProps {
  noteItem: NoteItem;
  roomId: string;
}

function Note(props: NoteProps) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [format, setFormat] = useState("");

  const clearError = () => {
    setErrorMsg("");
  };
  // Formatting
  const handleFormatClick = (formatType: SetStateAction<string>) => {
    if (format === formatType) {
      setFormat(""); // Reset if clicked twice on the same format
    } else {
      setFormat(formatType); // Set the format if not set already
    }
  };

  // Alignment

  const [algignment, setAlignment] = useState("");
  const handleAlignmentClick = (alignmentType: SetStateAction<string>) => {
    if (algignment === alignmentType) {
      setAlignment(""); // Reset if clicked twice on the same alignment
    } else {
      setAlignment(alignmentType); // Set the alignment if not set already
    }
  };

  const handleDelete = async () => {
    const resp = await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.noteItem.id }),
    });

    if (resp.ok) {
      const data = await resp.json();
      router.push(`/rooms/${props.roomId}/notes`);
    } else {
      const data = await resp.json();
    }
  };

  return (
    <div>
      <h1 className="mt-12 text-h1">{props.noteItem.title}</h1>
      <Formik
        initialValues={{
          title: props.noteItem.title,
          text: props.noteItem.text,
        }}
        onSubmit={async (values: EditNote, actions) => {
          const resp = await fetch(`/api/notes`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: props.noteItem.id,
              title: values.title,
              text: values.text,
              note_widget_fk: values.note_widget_fk,
            }),
          });

          if (resp.ok) {
            // Handle success, e.g., show a success message or redirect
            const data = await resp.json();
          } else {
            // Handle error, e.g., show an error message
            const data = await resp.json();
            if (data.msg) {
              setErrorMsg(data.msg);
            } else {
              setErrorMsg(data.error[0].message);
            }
          }
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid gap-3 mt-2" autoComplete="off">
            {/* Submit Button */}
            <div className="flex justify-end gap-2 items-center">
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
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="text-h5 rounded-3xl justify-center "
                >
                  {isSubmitting ? (
                    <span>Deleting...</span>
                  ) : (
                    <span>Delete Note</span>
                  )}
                </button>
              </div>
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
                        fillRule="evenodd"
                        d="M15 4H0V3h15v1ZM6 8H0V7h6v1Zm3 4H0v-1h9v1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Align center */}
                  <button
                    type="button"
                    onClick={() => handleAlignmentClick("center")}
                  >
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
                Last edit by Cleo: March 25th 2023
              </p>
            </div>
          </Form>
        )}
      </Formik>
      <ErrorToast msg={errorMsg} onDismiss={clearError} />
    </div>
  );
}

export default Note;
