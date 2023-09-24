import { Field, ErrorMessage } from "formik";

function LastNameInput() {
  return (
    <div>
      <label htmlFor="last_name">Last name</label>
      <Field type="last_name" name="last_name" />
      <ErrorMessage name="last_name" component="div" />
    </div>
  );
}

export default LastNameInput;
