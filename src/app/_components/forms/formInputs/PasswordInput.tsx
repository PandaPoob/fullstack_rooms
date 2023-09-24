import { Field, ErrorMessage } from "formik";

function PasswordInput() {
  return (
    <div>
      <label htmlFor="password">Password</label>
      <Field type="password" name="password" />
      <ErrorMessage name="password" component="div" />
    </div>
  );
}

export default PasswordInput;
