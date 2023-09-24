import { Field, ErrorMessage } from "formik";

function FirstNameInput() {
  return (
    <div className="grid min-h-[40px]">
      <label htmlFor="first_name">First name</label>
      <Field type="first_name" name="first_name" id="first_name" />
      <ErrorMessage name="first_name" component="div" />
    </div>
  );
}

export default FirstNameInput;
