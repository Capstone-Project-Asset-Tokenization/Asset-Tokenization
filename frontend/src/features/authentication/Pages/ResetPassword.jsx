import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useResetPasswordMutation } from "../../../stores/auth/authAPI";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL params
  const navigate = useNavigate(); // Initialize useNavigate
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleFormSubmit = (values, { setSubmitting }) => {
    resetPassword({ ...values, token });
    setSubmitting(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/signin");
      }, 3000); 
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] ">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Reset Your Password
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
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className="bg-neutral-800 mb-4 text-white border-0 outline-none p-2 px-3 rounded w-full"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="bg-neutral-800 mb-4 text-white border-0 outline-none p-2 px-3 rounded w-full"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isSubmitting || isLoading ? "Submitting..." : "Submit"}
                </button>

                {isSuccess && (
                  <div className="mt-6 text-green-500">
                    Password has been successfully reset. Redirecting to
                    login...
                  </div>
                )}

                {isError && (
                  <div className="mt-6 text-red-500">
                    {error?.data?.msg ||
                      "An error occurred. Please try again later."}
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

export default ResetPassword;
