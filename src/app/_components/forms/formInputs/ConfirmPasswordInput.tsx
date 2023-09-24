import { Field, ErrorMessage } from "formik";

function ConfirmPasswordInput() {
  return (
    <div>
      <label htmlFor="password_confirm">Confirm password</label>
      <Field type="password_confirm" name="password_confirm" />
      <ErrorMessage name="password_confirm" component="div" />
    </div>
  );
}

export default ConfirmPasswordInput;
