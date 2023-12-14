"use client";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { UserSignupForm } from "@/app/_models/user";
import BirthdayInput from "./formInputs/BirthdayInput";
import ConfirmPasswordInput from "./formInputs/ConfirmPasswordInput";
import EmailInput from "./formInputs/EmailInput";
import FirstNameInput from "./formInputs/FirstNameInput";
import LastNameInput from "./formInputs/LastNameInput";
import PasswordInput from "./formInputs/PasswordInput";
import createuserschema from "@/app/_utils/validation/schemas/user-signup-schema";
import ErrorToast from "../toasts/ErrorToast";
import { useState } from "react";
import Link from "next/link";

function SignUpForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <>
      <div className={`${success ? "flex" : "hidden"} flex-col max-w-lg`}>
        <h3 className="text-h3 lg:text-h2 mb-5">Registration Successful!</h3>
        <p>
          Before you can log in, please verify your email by clicking the
          verification link sent to your inbox. If you do not see the email,
          please check your spam folder.
        </p>
        <span className="mt-3">
          Already verified your email? Go to{" "}
          <Link href="/login" className="font-medium">
            Login
          </Link>
        </span>
      </div>

      <div className={`${success ? "hidden" : "block"}`}>
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
            actions.setSubmitting(true);
            const resp = await fetch("/api/user/signup", {
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
              setSuccess(true);
            } else {
              const data = await resp.json();
              actions.setSubmitting(false);

              if (data.msg) {
                setErrorMsg(data.msg);
              } else {
                setErrorMsg(data.error[0].message);
              }
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

              <PasswordInput
                error={errors.password}
                touched={touched.password}
              />

              <ConfirmPasswordInput
                error={errors.password_confirm}
                touched={touched.password_confirm}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-btn-gradient text-h5 py-4 mx-auto min-w-[14rem] rounded-3xl flex items-center justify-center min-h-[3.13rem]"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <span>Sign up</span>
                )}
              </button>
            </Form>
          )}
        </Formik>
        <ErrorToast msg={errorMsg} onDismiss={clearError} />
      </div>
    </>
  );
}

export default SignUpForm;
