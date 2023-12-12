import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import ErrorToast from "../toasts/ErrorToast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import TitleInput from "./formInputs/TitleInput";
import { EventCreateForm } from "@/app/_models/event";
import DescriptionInput from "./formInputs/DescriptionInput";
import RoomSelect from "./formInputs/RoomSelect";
import LocationInput from "./formInputs/LocationInput";

interface CreateEventFormProps {
  roomOptions: { title: string; id: string }[];
}

function CreateEventForm({ roomOptions }: CreateEventFormProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const { data: session } = useSession();

  const clearError = () => {
    setErrorMsg("");
  };

  const contactFormSchema = z.object({
    first_name: z.string({
      required_error: "Please enter your name",
    }),
  });

  return (
    <div>
      <h3 className="text-h2 font-normal mb-6">Create new event</h3>

      <Formik
        initialValues={{ title: "", description: "", roomId: "", location: "" }}
        onSubmit={async (values: EventCreateForm, actions) => {
          console.log(values);
        }}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form>
            <TitleInput
              error={errors.title}
              touched={touched.title}
              placeholder="Housewarming"
            />
            <RoomSelect
              setFieldValue={setFieldValue}
              options={roomOptions}
              error={errors.roomId}
              touched={touched.roomId}
            />
            <DescriptionInput
              error={errors.description}
              touched={touched.description}
            />
            <LocationInput error={errors.location} touched={touched.location} />
            <Field type="date" name="title" id="title" /> {/* Start time */}
            {/* End time */}
            {/* All day checkbox */}
            {/* Location */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-btn-gradient text-h5 py-4 mx-auto min-w-[14rem] rounded-3xl flex items-center justify-center min-h-[3.13rem] mt-6"
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
                <span>Create event</span>
              )}
            </button>
          </Form>
        )}
      </Formik>
      <ErrorToast msg={errorMsg} onDismiss={clearError} />
    </div>
  );
}
export default CreateEventForm;
