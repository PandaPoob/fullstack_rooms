import { Field, ErrorMessage } from "formik";

function SearchInput({
  error,
  touched,
  children,
}: {
  error: string | undefined;
  touched: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[5.3rem] flex flex-col w-full">
      <label
        htmlFor="search"
        hidden
        className="font-medium text-h5 text-darkGrey mb-1"
      >
        City
      </label>
      <div className="flex gap-2 w-full">
        <Field
          type="text"
          name="search"
          id="search"
          className={`bg-primary  w-full text-white h-14 placeholder:text-darkGrey focus:outline-none focus:border-secondary focus:border px-5 rounded-l-lg 
           ${error && touched && "border border-warning"}`}
          placeholder="Copenhagen"
        />
        {children}
      </div>
      <ErrorMessage
        className="text-warning mt-2 italic text-right text-sm"
        name="search"
        component="div"
      />
    </div>
  );
}

export default SearchInput;
