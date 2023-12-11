import { Field, Form, Formik } from "formik";
import ErrorToast from "../toasts/ErrorToast";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { City, LocationFormType } from "@/app/_models/location";
import locationschema from "@/app/_utils/validation/schemas/location-schema";

interface LocationFormProps {
  city: City;
  hasLocation: boolean;
  setCityResult: (city: City[] | []) => void;
}

function LocationForm({ city, hasLocation, setCityResult }: LocationFormProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const { data: session, update } = useSession();

  const clearError = () => {
    setErrorMsg("");
  };

  return (
    <>
      <Formik
        initialValues={{
          id: city.id,
          latitude: city.coord.lat,
          longitude: city.coord.lon,
          country: city.country,
          city: city.name,
          state: city.state || undefined,
        }}
        validationSchema={toFormikValidationSchema(locationschema)}
        onSubmit={async (values: LocationFormType, actions) => {
          console.log("got here");

          actions.setSubmitting(true);

          console.log(values);

          if (session) {
            const method = hasLocation ? "PUT" : "POST";

            const resp = await fetch(`/api/location`, {
              method: method,
              headers: {
                Authorization: `Bearer ${session.token.sub}`,
              },
            });
            if (resp.ok) {
              const data = await resp.json();
              console.log(data);
              setCityResult([]);
            } else {
              setErrorMsg("An error occurred");
            }
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex gap-3 xxl:px-20 border-b border-grey py-3 items-center justify-between">
              <Field type="hidden" name="id" id="id" />
              <Field type="hidden" name="latitude" id="latitude" />
              <Field type="hidden" name="longitude" id="longitude" />
              <Field type="hidden" name="country" id="country" />
              <Field type="hidden" name="city" id="city" />
              <Field type="hidden" name="state" id="state" />
              <div className="flex gap-1">
                <p>{city.name},</p>
                <p>{city.country}</p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-h5 text-grey py-2 px-3 rounded-full flex items-center border border-white justify-center hover:bg-opacity-0 hover:text-white transition"
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
                  <span>Choose location</span>
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
      <ErrorToast msg={errorMsg} onDismiss={clearError} />
    </>
  );
}

export default LocationForm;