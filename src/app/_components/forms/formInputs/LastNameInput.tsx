import { Field, ErrorMessage } from "formik";

function LastNameInput() {
  return (
    <div className="grid">
      <label htmlFor="last_name">Last name</label>
      <Field type="last_name" name="last_name" id="last_name" />
      <ErrorMessage className="text-warning" name="last_name" component="div" />
    </div>
  );
}

export default LastNameInput;
