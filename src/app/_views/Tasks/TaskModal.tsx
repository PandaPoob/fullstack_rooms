"use client";
import Link from "next/link";
import TaskForm from "@/app/_components/forms/TaskForm";
import { Room, TaskItem } from "@prisma/client";
import TaskItemForm from "@/app/_components/forms/TaskItemForm";
import { useState } from "react";

interface TaskWidgetProps {
  tasks?: TaskItem[];
  room: Room;
  taskWidgetId: string;
  // modalParams: { modal: string } | undefined | null;
}

export default function TaskModal({
  tasks,
  room,
  taskWidgetId,
}: TaskWidgetProps) {
  const [showOnlyChecked, setShowOnlyChecked] = useState(false);
  const [taskList, setTaskList] = useState<TaskItem[]>(tasks || []);

  return (
    <>
      <div className="w-full mt-3 text-center sm:mt-0  sm:text-left gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg leading-6 font-medium" id="modal-title">
            Tasks
          </h3>
          <div className="sm:flex sm:flex-row-reverse">
            <Link
              href={`/rooms/${room.id}/`}
              type="button"
              className="w-full inline-flex justify-center rounded-md border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              &#10005;
            </Link>
          </div>
        </div>

        <TaskForm
          room={room}
          taskWidgetId={taskWidgetId}
          taskList={taskList}
          setTaskList={setTaskList}
        />

        <div className="my-4">
          <input
            type="checkbox"
            onChange={(event) => setShowOnlyChecked(event.target.checked)}
            className="mr-2 border-secondary bg-primary ring-offset-primary "
          />
          <label htmlFor="" className="text-mini">
            Show only checked
          </label>
        </div>
        <hr className="border border-primary my-4 " />
      </div>
      <div className="h-full">
        <ul className="max-h-[50%] md:max-h-[65%] h-full flex overflow-y-scroll	flex-col">
          {!showOnlyChecked
            ? taskList?.map((taskitem) => (
                <TaskItemForm
                  key={taskitem.id}
                  id={taskitem.id}
                  text={taskitem.text}
                  checked={taskitem.checked}
                  taskList={taskList}
                  setTaskList={setTaskList}
                />
              ))
            : taskList
                .filter((task) => task.checked)
                .map((task) => (
                  <TaskItemForm
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    checked={task.checked}
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                ))}
        </ul>
      </div>
    </>
  );
}
