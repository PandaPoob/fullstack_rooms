import { Field, FormikErrors } from "formik";
import { useState } from "react";
import { email } from "@/app/_utils/validation/validations/email-validation";
import { RoomCreateForm } from "@/app/_models/room";
import { useSession } from "next-auth/react";

interface EmailFieldArrayProps {
  setFieldValue: (
    field: any,
    value: any
  ) => Promise<void | FormikErrors<RoomCreateForm>>;
  emails: string[];
}

function EmailFieldArray({ setFieldValue, emails }: EmailFieldArrayProps) {
  const { data: session } = useSession();

  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState("");

  const handleInviteUser = async () => {
    setError("");
    //Validate email format
    const valResult = email.safeParse(inputEmail);
    if (!valResult.success) {
      setError(valResult.error.errors[0].message);
    }

    if (session?.user.email === inputEmail) {
      //error
    }

    const updatedEmails = [...emails, inputEmail];

    //Validate that no more than 12 users can be added
    if (updatedEmails.length >= 12) {
      setError("Max number of users in a room is 12");
    }

    //Validate that you cannot add yourself
    //Validate that you cannot add the same email twice

    //validate if email exists

    if (!error) {
      setFieldValue("emails", updatedEmails);
    }
  };

  return (
    <div>
      <div className="min-h-[6.7rem] flex flex-col">
        <label
          htmlFor="email"
          className="font-medium text-h5 text-darkGrey mb-1"
        >
          Invite users
        </label>
        <div className="flex w-full">
          <input
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            className={`bg-primary w-full text-white h-14 placeholder:text-darkGrey focus:outline-none focus:border-secondary focus:border px-5 rounded-lg ${
              error && "border border-warning"
            }`}
            placeholder="Email"
          />
          <button
            type="button"
            className="min-w-[8rem]"
            onClick={() => handleInviteUser()}
          >
            Invite user
          </button>
        </div>
        {error && (
          <div>
            <span className="text-warning mt-2 italic text-right text-sm">
              {error}
            </span>
          </div>
        )}
      </div>

      {/* one input component for email */}

      {/* one component to display emails */}
    </div>
  );
}

export default EmailFieldArray;
/*             <FieldArray name="emails">
              {({ push, remove, form }) => (
                <div>
                  {form.values.emails.map((email: string, index: number) => (
                    <div key={index}>
                      <Field
                        name={`emails.${index}`}
                        placeholder="Enter email"
                        // Other props like type="email", validation, etc.
                      />
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push("")}>
                    Add Email
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="flex flex-col">
              {values.emails.map((email, index) => (
                <button key={email + index} onClick={() => remove(index)} className="flex gap-2 items-center">
                  <span>{email}</span>
                  <svg
                    className="rotate-45 w-3"
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2143 0H13.3571C13.5476 0 13.6429 0.0952381 13.6429 0.285714V25.4286C13.6429 25.619 13.5476 25.7143 13.3571 25.7143H11.2143C11.0238 25.7143 10.9286 25.619 10.9286 25.4286V0.285714C10.9286 0.0952381 11.0238 0 11.2143 0Z"
                      fill="white"
                    />
                    <path
                      d="M0.285714 11.5H24.2857C24.4762 11.5 24.5714 11.5952 24.5714 11.7857V13.9286C24.5714 14.119 24.4762 14.2143 24.2857 14.2143H0.285714C0.0952381 14.2143 0 14.119 0 13.9286V11.7857C0 11.5952 0.0952381 11.5 0.285714 11.5Z"
                      fill="white"
                    />
                  </svg>
                </button>
              ))}
            </div>
 */
