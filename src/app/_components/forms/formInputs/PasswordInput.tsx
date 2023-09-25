import { Field, ErrorMessage } from "formik";

function PasswordInput() {
  return (
    <div className="grid">
      <label htmlFor="password">Password</label>
      <Field type="password" name="password" id="password" className="bg-primary text-white"/>
      <ErrorMessage className="text-warning" name="password" component="div" />
    </div>
  );
}

export default PasswordInput;
