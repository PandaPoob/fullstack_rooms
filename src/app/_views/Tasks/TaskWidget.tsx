"use client";
import TaskListItem from "@/app/_views/Tasks/TaskListItem";
import { Room, TaskItem } from "@prisma/client";

interface TaskWidgetProps {
  tasks?: TaskItem[];
  room: Room;
  taskWidgetId: string;
  modalParams: { modal: string } | undefined | null;
}

function TaskWidget(props: TaskWidgetProps) {
  return (
    <>
      <h3 className="text-h3">Tasks</h3>
      <ul className="flex h-full max-h-[200px] overflow-y-auto flex-col">
        {props.tasks?.map((taskitem) => (
          <TaskListItem
            key={taskitem.id}
            id={taskitem.id}
            text={taskitem.text}
            checked={taskitem.checked}
          />
        ))}
      </ul>
    </>
  );
}

export default TaskWidget;
