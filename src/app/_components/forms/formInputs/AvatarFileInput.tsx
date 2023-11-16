import { UserEdit } from "@/app/_models/user";
import { Field, FieldInputProps, FormikErrors, FormikTouched } from "formik";

function AvatarFileInput({
  setFieldValue,
  error,
  touched,
}: {
  setFieldValue: (
    field: any,
    value: any
  ) => Promise<void | FormikErrors<UserEdit>>;
  error: string | undefined;
  touched: boolean | undefined;
}) {
  return (
    <div>
      <Field>
        {({ field }: { field: FieldInputProps<string> }) => (
          <input
            id="avatar_img"
            type="file"
            name="avatar_img"
            onBlur={field.onBlur}
            //accept="image/png, image/jpeg, image/webp"
            //value={""}
            onChange={(event) => {
              if (event.currentTarget.files) {
                setFieldValue("avatar_img", event.currentTarget.files[0]);
              }
            }}
          />
        )}
      </Field>
      {error && touched && (
        <p className="text-warning mt-2 italic text-right text-sm">{error}</p>
      )}
    </div>
  );
}

export default AvatarFileInput;
