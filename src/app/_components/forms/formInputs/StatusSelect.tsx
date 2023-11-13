import { Status } from "@prisma/client";
import { Field } from "formik";

interface StatusSelectProps {
  options: Status[];
  error: string | undefined;
  touched: boolean | undefined;
}

function StatusSelect(props: StatusSelectProps) {
  return (
    <div className="min-h-[5.5rem]">
      <div className="grid relative">
        <Field
          as="select"
          name="status"
          className={`bg-primary text-white h-14 peer placeholder:text-primary focus:outline-none focus:border-secondary focus:border px-5 pt-3 rounded-lg 
          peer-visible:bg-white border-primary ${
            props.error && props.touched && "border border-warning"
          }`}
        >
          {props.options.map((opt) => {
            return (
              <option key={opt.id} value={opt.id}>
                {opt.title}
              </option>
            );
          })}
        </Field>
        <label
          htmlFor="status"
          className="absolute left-0 top-1 text-secondary text-sm transition-all px-5
          peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
          peer-focus:top-1 peer-focus:text-sm peer-focus:translate-y-0"
        >
          Status
        </label>
        <span className={`absolute top-1/2 -translate-y-1/2 right-5`}>
          arrow
        </span>
      </div>
    </div>
  );
}

export default StatusSelect;
