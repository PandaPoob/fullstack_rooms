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
import createeventschema from "@/app/_utils/validation/schemas/event-create-schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import DateInput from "./formInputs/DateInput";
import TimeInput from "./formInputs/TimeInput";

interface CreateEventFormProps {
  roomOptions: { title: string; id: string }[];
  chosenDate: string;
}

function CreateEventForm({ roomOptions, chosenDate }: CreateEventFormProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState<EventCreateForm>({
    title: "",
    description: "",
    roomId: "",
    location: "",
    startDate: chosenDate,
    startTime: "",
    endDate: "",
    endTime: "",
  });
  const { data: session } = useSession();

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <div>
      <h3 className="text-h2 font-normal mb-6">Create new event</h3>

      <Formik
        initialValues={formValues}
        validationSchema={toFormikValidationSchema(createeventschema)}
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
            <div className="flex gap-3 w-full flex-wrap">
              <RoomSelect
                setFieldValue={setFieldValue}
                options={roomOptions}
                error={errors.roomId}
                touched={touched.roomId}
              />
              <LocationInput
                error={errors.location}
                touched={touched.location}
              />
            </div>

            <DescriptionInput
              error={errors.description}
              touched={touched.description}
            />

            <div className="flex gap-4">
              {/* Start date */}
              <div className="flex">
                <DateInput
                  error={errors.startDate}
                  touched={touched.startDate}
                  label={"Start date"}
                  name={"startDate"}
                />
                <TimeInput
                  error={errors.startTime}
                  touched={touched.startTime}
                  label={"Start time"}
                  name={"startTime"}
                />
                {/* <Field type="time" /> */}
              </div>
              {/* End date */}
              <DateInput
                error={errors.startDate}
                touched={touched.startDate}
                label={"End date"}
                name={"endDate"}
              />
            </div>
            {/* Start time */}
            {/* End time */}
            {/* All day checkbox */}
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
