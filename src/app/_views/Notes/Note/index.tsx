"use client";
import { EditNote, ExpandedNoteItem } from "@/app/_models/notes";
import { NoteItem } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import { SetStateAction, useState } from "react";
import ErrorToast from "@/app/_components/toasts/ErrorToast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NoteProps {
  noteItem: ExpandedNoteItem;
  roomId: string;
}

function Note(props: NoteProps) {
  console.log(props.noteItem.text_format);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const [textFormat, setTextFormat] = useState(
    props.noteItem.text_format?.formatting || ""
  );
  const [titleFormat, setTitleFormat] = useState(
    props.noteItem.title_format?.formatting || ""
  );

  const [titleAlignment, setTitleAlignment] = useState(
    props.noteItem.title_alignment?.alignment || ""
  );

  const [textAlignment, setTextAlignment] = useState(
    props.noteItem.text_alignment?.alignment || ""
  );

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

  // Text Alignment

  const handleTextAlignmentClick = (alignmentType: string) => {
    if (textAlignment === alignmentType) {
      setTextAlignment(""); // Reset if clicked twice on the same alignment
    } else {
      setTextAlignment(alignmentType); // Set the alignment if not set already
    }
  };

  // Title Alignment
  const handleTitleAlignmentClick = (alignmentType: string) => {
    if (titleAlignment === alignmentType) {
      setTitleAlignment(""); // Reset if clicked twice on the same alignment
    } else {
      setTitleAlignment(alignmentType); // Set the alignment if not set already
    }
  };

  const clearError = () => {
    setErrorMsg("");
  };

  const [isTitle, setIsTitle] = useState(true); // On click på input felt, som sætter state

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
      {/* <Link href={`/rooms/${props.room_id}/notes/`}>
        <p>Go back</p>
      </Link> */}
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
              text_format: textFormat,
              title_format: textFormat,
              text_alignment: textAlignment,
              title_alignment: titleAlignment,
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
        {/* touched, set et nyt state og lyt på det state som er senest er rørt ved afhægigt om det er title eller text - så sæt format efter det. */}
        {({ isSubmitting, touched }) => (
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
                {/* Title buttons */}
                <div
                  className={`flex gap-6 text-h5 mt-2 mx-4 ${
                    isTitle ? "hidden" : "block"
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
                    className={`${textFormat.includes("italic") && "italic"}`}
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
                {/* Text buttons */}
                <div
                  className={`flex gap-6 text-h5 mt-2 mx-4 ${
                    !isTitle ? "hidden" : "block"
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
                    className={`${textFormat.includes("italic") && "italic"}`}
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

                {/* Title Alignment */}
                <div className="flex gap-6 mx-4">
                  {/* Align left */}
                  <button
                    type="button"
                    onClick={() => handleTitleFormatClick("left")}
                    className={titleAlignment.includes("left") ? "left" : ""}
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
                    onClick={() => handleTitleFormatClick("center")}
                    className={
                      titleAlignment.includes("center") ? "center" : ""
                    }
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
                    onClick={() => handleTitleFormatClick("right")}
                    className={titleAlignment.includes("right") ? "right" : ""}
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
                {/* Text Alignment */}
                {/* div text here */}
              </div>
              {/* Værktøjslinje end */}
              {/* Note Title Field */}
              <div className="bg-primary rounded-md">
                <div className="flex items-center">
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title ..."
                    className={`w-full rounded-md bg-primary text-white focus:outline-none focus:bg-primary-dark p-4 text-2xl mt-2 font-bold placeholder-secondary ${
                      titleFormat.includes("bold") ? "font-bold" : ""
                    } ${titleFormat.includes("italic") ? "italic" : ""} ${
                      titleFormat.includes("underline") ? "underline" : ""
                    } ${touched.title && titleFormat === "" ? "normal" : ""}`}
                    onClick={() => setIsTitle(true)}
                  />
                </div>
                {/* Note Text Field */}
                <div className="flex items-center">
                  <Field
                    as="textarea"
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
                    } ${
                      textAlignment === "left"
                        ? "text-left"
                        : textAlignment === "center"
                        ? "text-center"
                        : textAlignment === "right"
                        ? "text-right"
                        : ""
                    } w-full h-96 rounded-md bg-primary text-white focus:outline-none focus:bg-primary-dark p-4 placeholder-secondary ${
                      touched.text && textFormat === "" ? "normal" : ""
                    }`}
                    onClick={() => setIsTitle(false)}
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
