import { Field, ErrorMessage } from "formik";

function EmailInput() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <Field type="email" name="email" />
      <ErrorMessage name="email" component="div" />
    </div>
  );
}

export default EmailInput;
