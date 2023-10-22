"use client";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { UserSignupForm } from "@/app/_models/user";
import { useRouter } from "next/navigation";
import BirthdayInput from "./formInputs/BirthdayInput";
import ConfirmPasswordInput from "./formInputs/ConfirmPasswordInput";
import EmailInput from "./formInputs/EmailInput";
import FirstNameInput from "./formInputs/FirstNameInput";
import LastNameInput from "./formInputs/LastNameInput";
import PasswordInput from "./formInputs/PasswordInput";
import createuserschema from "@/app/_utils/validation/schemas/user-signup-schema";

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
        validationSchema={toFormikValidationSchema(createuserschema)}
        onSubmit={async (values: UserSignupForm, actions) => {
          //console.log(values);
          actions.setSubmitting(false);
          const resp = await fetch("api/user/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              password: values.password,
              password_confirm: values.password_confirm,
              birthday: values.birthday,
            }),
          });
          if (resp.ok) {
            //router
            router.push("/login");
          } else {
            const data = await resp.json();
            //display alert
            console.log("An error occurred");
            console.log(data.error[0].message);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="grid gap-3" autoComplete="off">
            <div className="grid md:grid-cols-2 gap-3">
              <FirstNameInput
                error={errors.first_name}
                touched={touched.first_name}
              />

              <LastNameInput
                error={errors.last_name}
                touched={touched.last_name}
              />
            </div>
            <BirthdayInput errors={errors} touched={touched} />

            <EmailInput error={errors.email} touched={touched.email} />

            <PasswordInput error={errors.password} touched={touched.password} />

            <ConfirmPasswordInput
              error={errors.password_confirm}
              touched={touched.password_confirm}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-btn-gradient text-h5 py-4 mx-auto min-w-[14rem] rounded-3xl"
            >
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
