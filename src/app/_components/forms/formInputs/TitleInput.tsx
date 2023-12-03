import { Field, ErrorMessage } from "formik";

function TitleInput({
  error,
  touched,
}: {
  error: string | undefined;
  touched: boolean | undefined;
}) {
  return (
    <div className="min-h-[6.7rem] flex flex-col">
      <label htmlFor="title" className="font-medium text-h5 text-darkGrey mb-1">
        Title
      </label>
      <Field
        type="text"
        name="title"
        id="title"
        className={`bg-primary text-white h-14 placeholder:text-darkGrey focus:outline-none focus:border-secondary focus:border px-5 rounded-lg 
           ${error && touched && "border border-warning"}`}
        placeholder="Datababes"
      />

      <ErrorMessage
        className="text-warning mt-2 italic text-right text-sm"
        name="title"
        component="div"
      />
    </div>
  );
}

export default TitleInput;
