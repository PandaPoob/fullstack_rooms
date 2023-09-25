import { Field, ErrorMessage } from "formik";

function FirstNameInput() {
  return (
    <div className="grid">
      <label htmlFor="first_name">First name</label>
      <Field type="first_name" name="first_name" id="first_name" className="bg-primary text-white"/>
      <ErrorMessage
        className="text-warning"
        name="first_name"
        component="div"
      />
    </div>
  );
}

export default FirstNameInput;
