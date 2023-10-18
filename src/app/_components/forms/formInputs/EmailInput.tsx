import { Field, ErrorMessage } from "formik";

function EmailInput() {
  return (
    <div className="grid">
      <label htmlFor="email">Email</label>
      <Field type="email" name="email" id="email" className="bg-primary text-white"/>
      <ErrorMessage className="text-warning" name="email" component="div" />
    </div>
  );
}

export default EmailInput;
