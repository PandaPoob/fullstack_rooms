"use client";
import { createuserfrontendschema as userschema } from "@/app/_utils/validation/schemas/create-user-frontend-schema";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FirstNameInput from "./formInputs/FirstNameInput";
import LastNameInput from "./formInputs/LastNameInput";
import EmailInput from "./formInputs/EmailInput";
import PasswordInput from "./formInputs/PasswordInput";
import ConfirmPasswordInput from "./formInputs/ConfirmPasswordInput";
import BirthdayInput from "./formInputs/BirthdayInput";
import { CreateUserForm } from "@/app/models/createuserform.model";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const router = useRouter();
  //add api and error handling email

  return (
    <div>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          password_confirm: "",
          birthday: "",
        }}
        validationSchema={toFormikValidationSchema(userschema)}
        onSubmit={async (values: CreateUserForm, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          //onCallback(values);
          const resp = await fetch("api/signup", {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              password: values.password,
              birthday: values.birthday,
            }),
          });
          if (resp.ok) {
            //router
            router.push("/login");
          } else {
            //display alert
            console.log("An error occurred");
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="grid gap-3">
            <FirstNameInput />

            <LastNameInput />

            <EmailInput />

            <PasswordInput />

            <ConfirmPasswordInput />

            <BirthdayInput errors={errors} touched={touched} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-btn-gradient"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
