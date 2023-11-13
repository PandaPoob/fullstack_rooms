import { Field, FieldInputProps, FormikErrors, FormikTouched } from "formik";

function StatusSelect() {
  return (
    <Field as="select" name="status">
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </Field>
  );
}

export default StatusSelect;
