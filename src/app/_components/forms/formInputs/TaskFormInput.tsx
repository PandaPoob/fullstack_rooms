import { Field } from "formik";

type TaskItemProps = {
  id: string;
  text: string;
  checked: boolean;
};

function TaskFormInput({ id, text, checked }: TaskItemProps) {
  return (
    <div className="w-full">
      <div className="grid relative">
        <Field
          id={id}
          type="checkbox"
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
  );
}

export default TaskFormInput;
