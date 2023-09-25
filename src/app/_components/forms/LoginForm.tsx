"use client";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { UserCredentials } from "@/app/models/usercredentials.model";
import userloginschema from "@/app/_utils/validation/schemas/user-login-schema";
import EmailInput from "./formInputs/EmailInput";
import PasswordInput from "./formInputs/PasswordInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

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
        validationSchema={toFormikValidationSchema(userloginschema)}
        onSubmit={async (values: UserCredentials, actions) => {
          actions.setSubmitting(false);
       

        const loginData = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            })

            console.log(loginData);
            
             if(loginData?.error) {
                //show alert
                console.log(loginData.error)
            } else {
                router.push("/")
            }

        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid gap-3">

            <EmailInput />

            <PasswordInput />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-btn-gradient"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;