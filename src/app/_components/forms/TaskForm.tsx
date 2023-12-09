"use client";
import { Field, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { CreateTaskForm } from "@/app/_models/tasks";
import taskSchema from "@/app/_utils/validation/schemas/create-task-schema";
import TaskInput from "./formInputs/TaskInput";
import { useState } from "react";
import ErrorToast from "../toasts/ErrorToast";
import { Room } from "@prisma/client";
import { useSession } from "next-auth/react";

interface TaskWidgetProps {
  room: Room;
  taskWidgetId: string;
}

function TaskForm({ taskWidgetId }: TaskWidgetProps) {
  const { data: session } = useSession();

  //   const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  // const task_widget_fk = task.task_widget_fk;
  // const created_by_fk = task.created_by_fk;

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <div>
      <Formik
        initialValues={{
          text: "",
          task_widget_fk: taskWidgetId, // Set task_widget_fk based on task prop
        }}
        validationSchema={toFormikValidationSchema(taskSchema)}
        onSubmit={async (values: CreateTaskForm, actions) => {
          actions.setSubmitting(true);
          if (session) {
            const resp = await fetch("/api/tasks", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.token.sub}`,
              },
              body: JSON.stringify({
                text: values.text,
                task_widget_fk: values.task_widget_fk,
                created_by_fk: session.user.id,
              }),
            });
            if (resp.ok) {
              setSuccess(true);
              const data = await resp.json();

              actions.resetForm({
                values: {
                  text: "",
                  task_widget_fk: taskWidgetId,
                },
              });
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
          <Form className="sm:block md:flex gap-2">
            <TaskInput error={errors.text} touched={touched.text} />
            <Field type="hidden" name="task_widget_fk" />
            <Field type="hidden" name="created_by_fk" />
            <div className="w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-btn-gradient text-h6 pb-2 pt-3 mx-auto min-w-[10rem] w-full md:min-h-[3.5rem] rounded-3xl flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span>Creating task...</span>
                ) : (
                  <span>+ Add Task</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ErrorToast msg={errorMsg} onDismiss={clearError} />
    </div>
  );
}

export default TaskForm;