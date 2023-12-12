"use client";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ErrorToast from "../toasts/ErrorToast";
import { Room, TaskItem } from "@prisma/client";

type TaskItemProps = {
  room: Room;
  taskWidgetId: string;
  id: string;
  text: string;
  checked: boolean;
  order: number;
  taskList: TaskItem[];
  setTaskList: (tasks: TaskItem[]) => void;
};

function TaskItemForm({
  room,
  taskWidgetId,
  id,
  text,
  checked,
  order,
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
            order: order,
            updated_by: session.user.id,
            task_widget_fk: taskWidgetId,
            roomId: room.id,
          }),
        });

        if (resp.ok) {
          setSuccess(true);
          const data = await resp.json();

          // Create a new array with the updated task
          const updatedTasks = taskList.map((task) =>
            task.id === data.updatedTask.id ? data.updatedTask : task
          );
          // Update the taskList state with the new array
          setTaskList(updatedTasks);
        } else {
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

  // Handling the order buttons
  const handleMoveUp = async () => {
    const currentIndex = taskList.findIndex((task) => task.id === id);
    if (currentIndex > 0) {
      const updatedTasks = [...taskList];
      [updatedTasks[currentIndex], updatedTasks[currentIndex - 1]] = [
        updatedTasks[currentIndex - 1],
        updatedTasks[currentIndex],
      ];
      setTaskList(updatedTasks);

      // Placeholder for API call to update task order in the database
      if (session) {
        try {
          const resp = await fetch("/api/tasks?orderUpdate=true", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.token.sub}`,
            },
            body: JSON.stringify({ tasks: updatedTasks }),
          });

          if (!resp.ok) {
            const data = await resp.json();
            setErrorMsg(data.msg || data.error[0].message);
          }
        } catch (error) {
          console.error("Error making API call:", error);
        }
      }
    }
  };

  const handleMoveDown = async () => {
    const currentIndex = taskList.findIndex((task) => task.id === id);
    if (currentIndex < taskList.length - 1) {
      const updatedTasks = [...taskList];
      [updatedTasks[currentIndex], updatedTasks[currentIndex + 1]] = [
        updatedTasks[currentIndex + 1],
        updatedTasks[currentIndex],
      ];
      setTaskList(updatedTasks);

      // Placeholder for API call to update task order in the database
      if (session) {
        try {
          const resp = await fetch("/api/tasks?orderUpdate=true", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.token.sub}`,
            },
            body: JSON.stringify({ tasks: updatedTasks }),
          });

          if (!resp.ok) {
            const data = await resp.json();
            setErrorMsg(data.msg || data.error[0].message);
          }
        } catch (error) {
          console.error("Error making API call:", error);
        }
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
            order: order,
            roomId: room.id,
          }}
          onSubmit={toggleChecked}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex w-full">
              <div className="w-full flex items-center">
                <div className="grid relative">
                  <Field type="hidden" name="roomId" />
                  <Field
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={toggleChecked}
                    className=" cursor-pointer bg-primary peer h-5 w-5 focus:ring-2 focus:ring-white focus:ring-offset-0  border border-gray-500 rounded-full"
                  />
                  <label
                    htmlFor={id}
                    className="ml-4 absolute left-auto top-1 text-secondary text-sm transition-all px-5
          peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-1 peer-focus:text-sm peer-focus:translate-y-0 whitespace-nowrap"
                  >
                    {text}
                  </label>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {/* Arrow up and down button */}
        <div className="flex mx-2">
          <button
            type="button"
            onClick={handleMoveDown}
            className="m-1 text-gray-300  text-mini"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#8F8F8F"
                d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleMoveUp}
            className="m-1 text-gray-300 text-mini"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#8F8F8F"
                d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z"
              />
            </svg>
          </button>
        </div>
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
                  task_widget_fk: taskWidgetId,
                  roomId: room.id,
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
                  className="bg-btn-gradient pb-2 pt-3 px-7 rounded-full text-mini mx-2"
                >
                  {isSubmitting ? (
                    <span>Deleting...</span>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>

              <Field type="hidden" name="taskId" />
              <Field type="hidden" name="roomId" />
              <Field type="hidden" name="roomId" />
            </Form>
          )}
        </Formik>
        <ErrorToast msg={errorMsg} onDismiss={clearError} />
      </div>
    </div>
  );
}

export default TaskItemForm;
