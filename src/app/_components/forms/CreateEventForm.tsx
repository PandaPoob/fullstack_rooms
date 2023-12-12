import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";

function CreateEventForm() {
  const contactFormSchema = z.object({
    first_name: z.string({
      required_error: "Please enter your name",
    }),
  });

  return (
    <div>
      <Formik
        initialValues={{ first_name: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <Field type="text" name="first_name" />
            <ErrorMessage name="email" component="div" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default CreateEventForm;
