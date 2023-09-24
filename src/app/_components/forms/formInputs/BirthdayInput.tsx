import { Field, FieldInputProps, FormikErrors, FormikTouched } from "formik";

type BirthdayInputProps = {
  errors: FormikErrors<{ birthday: string }>;
  touched: FormikTouched<{ birthday: boolean }>;
};

function BirthdayInput(props: BirthdayInputProps) {
  return (
    <div className="grid">
      <label htmlFor="birthday">Birthday</label>
      <Field name="birthday">
        {({ field }: { field: FieldInputProps<string> }) => (
          <input type="date" id="birthday" {...field} />
        )}
      </Field>
      {props.errors.birthday && props.touched.birthday && (
        <p className="text-warning">{props.errors.birthday}</p>
      )}
    </div>
  );
}

export default BirthdayInput;
