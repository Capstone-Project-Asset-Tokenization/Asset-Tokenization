import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRequestResetMutation } from "../../../stores/auth/authAPI";

const RequestReset = () => {
  const [requestReset, { isLoading, isSuccess, isError, error }] =
    useRequestResetMutation();
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    console.log("Reset Password Form Values", values);
    requestReset(values);
    // Handle form submission logic (e.g., send email with reset link)
    console.log(values); // Replace with actual logic to send reset email
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] ">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Request Password Reset
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="bg-neutral-800 mb-4 text-white border-0 outline-none p-2 px-3 rounded w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isSubmitting || isLoading
                    ? "Sending Email..."
                    : "Send Reset Email"}
                </button>
                <a
                  href="/signin"
                  className="block mt-4 text-center text-gray-400"
                >
                  Back to Login
                </a>
                {isSuccess && (
                  <div className="mt-6 text-green-500">
                    Check your email for instructions to reset your password.
                    Please also check your spam/junk folder.
                  </div>
                )}
                {isError && (
                  <div className="mt-6 text-red-500">
                    {error?.data?.msg ||
                      "An error occurred. Please try again later"}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RequestReset;
