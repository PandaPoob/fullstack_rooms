import { Field, ErrorMessage } from "formik";

function TaskInput({
  error,
  touched,
}: {
  error: string | undefined;
  touched: boolean | undefined;
}) {
  return (
    <div>
      <div className="grid relative mb-4 md:mb-0 w-full">
        <Field
          type="text"
          name="text"
          id="text"
          className={`bg-primary text-white h-12 peer placeholder:text-primary focus:outline-none focus:border-secondary focus:border px-5 pt-3 rounded-lg 
          peer-visible:bg-white ${error && touched && "border border-warning"}`}
          placeholder="text here...."
        />
        <label
          htmlFor="text"
          className="absolute left-0 top-1 text-grey text-sm transition-all px-5
          peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-1 peer-focus:text-sm peer-focus:translate-y-0 "
        >
          Create new task here...
        </label>
      </div>
      <ErrorMessage
        className="text-warning mt-2 italic text-right text-sm"
        name="text"
        component="div"
      />
    </div>
  );
}

export default TaskInput;
