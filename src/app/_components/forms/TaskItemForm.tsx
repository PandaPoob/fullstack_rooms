"use client";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ErrorToast from "../toasts/ErrorToast";
import { TaskItem } from "@prisma/client";

type TaskItemProps = {
  id: string;
  text: string;
  checked: boolean;
  taskList: TaskItem[];
  setTaskList: (tasks: TaskItem[]) => void;
};

function TaskItemForm({
  id,
  text,
  checked,
  taskList,
  setTaskList,
}: TaskItemProps) {
  const { data: session } = useSession();

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  // Add state to manage checked state
  const [isChecked, setIsChecked] = useState(checked);
  const toggleChecked = async () => {
    // Toggle the checked state immediately
    setIsChecked((prevChecked) => !prevChecked);

    // Make the API call
    if (session) {
      try {
        const resp = await fetch("/api/tasks", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token.sub}`,
          },
          body: JSON.stringify({
            id: id,
            checked: !isChecked, // Use the inverted state
            updated_by: session.user.id,
          }),
        });

        if (!resp.ok) {
          const data = await resp.json();
          if (data.msg) {
            setErrorMsg(data.msg);
          } else {
            setErrorMsg(data.error[0].message);
          }
        }
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full">
        <Formik
          initialValues={{
            taskId: id,
            checked: isChecked,
          }}
          onSubmit={toggleChecked}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex w-full">
              <div className="w-full">
                <div className="grid relative">
                  <Field
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={toggleChecked}
                    className="m-1 cursor-pointer bg-primary peer h-5 w-5 focus:ring-2 focus:ring-white focus:ring-offset-0  border border-gray-500 rounded-full"
                  />
                  <label
                    htmlFor={id}
                    className="ml-4 mt-1 absolute left-0 top-1 text-secondary text-sm transition-all px-5
          peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-1 peer-focus:text-sm peer-focus:translate-y-0"
                  >
                    {text}
                  </label>
                </div>
              </div>
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
                const updatedTasks = taskList.filter(
                  (task) => task.id !== data.deletedTask.id
                );
                setTaskList(updatedTasks);
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
                  type="submit"
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
