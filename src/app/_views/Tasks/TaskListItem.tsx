"use client";

type TaskListItemProps = {
  id: string;
  text: string;
  checked: boolean;
};

function TaskListItem({ id, text, checked }: TaskListItemProps) {
  return (
    <li className="flex gap-3 items-center py-1">
      <input
        id={id}
        type="checkbox"
        className="m-1 cursor-pointer bg-primary peer h-5 w-5 focus:ring-0 focus:ring-offset-0 text-info bg-gray-800 border border-gray-500 rounded-full"
        defaultChecked={checked}
      />
      <label
        htmlFor={id}
        className=" peer-checked:text-slate-500 truncate text-h6 pt-2"
      >
        {text}
      </label>
    </li>
  );
}

export default TaskListItem;
