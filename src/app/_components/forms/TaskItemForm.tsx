"use client";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ErrorToast from "../toasts/ErrorToast";
import TaskFormInput from "./formInputs/TaskFormInput";
import { boolean } from "zod";

type TaskItemProps = {
  id: string;
  text: string;
  checked: boolean;
};

function TaskItemForm({ id, text, checked }: TaskItemProps) {
  const { data: session } = useSession();

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full">
        <Formik
          initialValues={{
            checked: boolean,
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            if (session) {
              const resp = await fetch("/api/tasks", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.token.sub}`,
                },
                body: JSON.stringify({
                  checked: values.checked,
                  updated_by: session.user.id,
                }),
              });
              if (resp.ok) {
                setSuccess(true);
                const data = await resp.json();
              } else {
                const data = await resp.json();
                actions.setSubmitting(false);

                if (data.msg) {
                  setErrorMsg(data.msg);
                } else {
                  setErrorMsg(data.error[0].message);
                }
              }
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex w-full">
              <TaskFormInput key={id} id={id} text={text} checked={checked} />
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            taskId: id,
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            if (session) {
              const resp = await fetch("/api/tasks", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${session.token.sub}`,
                },
                body: JSON.stringify({
                  id: values.taskId,
                }),
              });

              if (resp.ok) {
                setSuccess(true);
                const data = await resp.json();
              } else {
                const data = await resp.json();
                actions.setSubmitting(false);

                if (data.msg) {
                  setErrorMsg(data.msg);
                } else {
                  setErrorMsg(data.error[0].message);
                }
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="ml-auto m-1 text-gray-300">
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="bg-btn-gradient py-2 px-5 rounded-full text-mini"
                >
                  {isSubmitting ? (
                    <span>Deleting task...</span>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>

              <Field type="hidden" name="taskId" />
            </Form>
          )}
        </Formik>
        <ErrorToast msg={errorMsg} onDismiss={clearError} />
      </div>
    </div>
  );
}

export default TaskItemForm;
