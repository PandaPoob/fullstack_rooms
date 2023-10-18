import { Field, ErrorMessage } from "formik";

function ConfirmPasswordInput() {
  return (
    <div className="grid">
      <label htmlFor="password_confirm">Confirm password</label>
      <Field type="password" name="password_confirm" id="password_confirm" className="bg-primary text-white" />
      <ErrorMessage
        className="text-warning"
        name="password_confirm"
        component="div"
      />
    </div>
  );
}

export default ConfirmPasswordInput;
