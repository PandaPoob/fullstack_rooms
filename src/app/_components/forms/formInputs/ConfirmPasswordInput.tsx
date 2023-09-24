import { Field, ErrorMessage } from "formik";

function ConfirmPasswordInput() {
  return (
    <div className="grid">
      <label htmlFor="password_confirm">Confirm password</label>
      <Field type="password_confirm" name="password_confirm" />
      <ErrorMessage
        className="text-warning"
        name="password_confirm"
        component="div"
      />
    </div>
  );
}

export default ConfirmPasswordInput;
