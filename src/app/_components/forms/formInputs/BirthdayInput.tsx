import { Field, FieldInputProps, FormikErrors, FormikTouched } from "formik";

type BirthdayInputProps = {
  errors: FormikErrors<{ birthday: string }>;
  touched: FormikTouched<{ birthday: boolean }>;
};

function BirthdayInput(props: BirthdayInputProps) {
  return (
    <div>
      <label htmlFor="birthday">Birthday</label>
      <Field name="birthday">
        {({ field }: { field: FieldInputProps<string> }) => (
          <input type="date" id="birthday" {...field} />
        )}
      </Field>
      {props.errors.birthday && props.touched.birthday && (
        <p>{props.errors.birthday}</p>
      )}
    </div>
  );
}

export default BirthdayInput;
