"use client";
import { createuserfrontendschema as userschema } from "@/app/_utils/validation/schemas/create-user-frontend-schema";
import { ErrorMessage, Field, FieldInputProps, Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import FirstNameInput from "./formInputs/FirstNameInput";
import LastNameInput from "./formInputs/LastNameInput";
import EmailInput from "./formInputs/EmailInput";
import PasswordInput from "./formInputs/PasswordInput";
import ConfirmPasswordInput from "./formInputs/ConfirmPasswordInput";
import BirthdayInput from "./formInputs/BirthdayInput";

//import { useState } from "react";

function SignUpForm() {
  /*   const [signupValues, setSignupValues] = useState<CreateUserForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirm: "",
    birthday: "",
  }); */

  //create inputs
  //add frontend msgs

  //add api and error handling

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
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          //onCallback(values);
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
              className="bg-blue-400"
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
