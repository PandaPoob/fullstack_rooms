"use client";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import ErrorToast from "../toasts/ErrorToast";
import FirstNameInput from "./formInputs/FirstNameInput";
import LastNameInput from "./formInputs/LastNameInput";
import BirthdayInput from "./formInputs/BirthdayInput";
import edituserschema from "@/app/_utils/validation/schemas/user-edit-schema";
import { UserEdit } from "@/app/_models/user";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import StatusSelect from "./formInputs/StatusSelect";

interface EditUserFormProps {
  profile: UserEdit;
}

function EditUserForm(props: EditUserFormProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const { data: session, update } = useSession();
  const [editValues, setEditValues] = useState<UserEdit>({
    first_name: props.profile.first_name || "",
    last_name: props.profile.last_name || "",
    birthday: props.profile.birthday || "",
  });

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <div>
      <div>
        {session?.user.first_name} {session?.user.last_name}
      </div>
      <Formik
        initialValues={editValues}
        validationSchema={toFormikValidationSchema(edituserschema)}
        onSubmit={async (values: UserEdit, actions) => {
          actions.setSubmitting(true);
          if (session) {
            setEditValues(values);
            const resp = await fetch(`/api/user/edit/${session.user.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.token.sub}`,
              },
              body: JSON.stringify(values),
            });
            if (resp.ok) {
              const data = await resp.json();
              if (data.updatedUser) {
                if (data.sessionUpdates.first_name) {
                  update({ first_name: data.sessionUpdates.first_name });
                }
                if (data.sessionUpdates.last_name) {
                  update({ last_name: data.sessionUpdates.last_name });
                }
              }
            } else {
              setErrorMsg("An error occurred");
            }
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="grid gap-3">
            <FirstNameInput
              error={errors.first_name}
              touched={touched.first_name}
            />

            <LastNameInput
              error={errors.last_name}
              touched={touched.last_name}
            />

            <BirthdayInput errors={errors} touched={touched} />

            <StatusSelect />

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
                <span>Save</span>
              )}
            </button>
          </Form>
        )}
      </Formik>
      <ErrorToast msg={errorMsg} onDismiss={clearError} />
    </div>
  );
}

export default EditUserForm;
