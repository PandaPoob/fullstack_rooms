"use client";
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import ErrorToast from "../toasts/ErrorToast";
import { useSession } from "next-auth/react";
import { ExtendedRoom } from "@/app/_models/room";
import EmailFieldArray from "./formInputs/EmailFieldArray";
import {
  ExtendedParticipant,
  ParticipantCreateForm,
} from "@/app/_models/participant";
import { participantcreateschema } from "@/app/_utils/validation/schemas/participant-create-schema";

interface EditRoomParticipantsFormProps {
  room: ExtendedRoom;
  setRoom: (room: ExtendedRoom) => void;
  participants?: ExtendedParticipant[];
}

function EditRoomParticipantsForm(props: EditRoomParticipantsFormProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const { data: session } = useSession();

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <div>
      <h2 className="text-h3 font-medium mb-5">Invite</h2>
      <Formik
        initialValues={{ emails: [], roomId: "" }}
        validationSchema={toFormikValidationSchema(participantcreateschema)}
        onSubmit={async (values: ParticipantCreateForm, actions) => {
          actions.setSubmitting(true);

          if (session) {
            const resp = await fetch(`/api/participants`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${session.token.sub}`,
              },
              body: JSON.stringify({ ...values }),
            });
            if (resp.ok) {
              const data = await resp.json();
              if (data.updatedRoom) {
                props.setRoom(data.updatedRoom);
              }
            } else {
              setErrorMsg("An error occurred");
            }
          }
        }}
      >
        {({
          isSubmitting,
          errors,
          values,
          setFieldValue,
          isValid,
          setFieldTouched,
          isValidating,
        }) => {
          return (
            <Form className="grid gap-3 xxl:px-20">
              <EmailFieldArray
                setFieldValue={setFieldValue}
                emails={values.emails}
                emailsError={errors.emails}
                isEditRoom
                participants={props.participants}
              />

              <Field type="hidden" name="roomId" id="roomId" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-btn-gradient text-h5 py-4 mx-auto min-w-[14rem] rounded-3xl flex items-center justify-center min-h-[3.13rem]"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <span>Invite</span>
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
      <ErrorToast msg={errorMsg} onDismiss={clearError} />
    </div>
  );
}

export default EditRoomParticipantsForm;
