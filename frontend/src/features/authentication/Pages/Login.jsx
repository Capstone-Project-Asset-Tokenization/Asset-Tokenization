import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import signInImage from "../../../assets/login_image.png";
import { useLoginMutation } from "../../../stores/auth/authAPI";
import {
  setToken,
  setUser,
  setWalletAddress,
} from "../../../stores/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [
    login,
    {
      isLoading: loginLoading,
      isSuccess: loginSuccessful,
      isError: loginError,
      data: response,
      error: LoginErrorData,
    },
  ] = useLoginMutation();
  let user = useSelector((state) => state.auth);
  const [requestVerification, setRequestVerification] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    login({
      email: values.usernameOrEmail,
      password: values.password,
      requestVerification,
    });
    setSubmitting(false);
    setTimeout(() => {
      setRequestVerification(false);
    }, 5000);
  };

  useEffect(() => {
    if (loginSuccessful) {
      dispatch(
        setUser({
          token: response.token,
          wallet: response.walletAddress,
          user: response.user,
          roles: response.user.roles,
        })
      );
      dispatch(setToken(response.token));
      dispatch(setWalletAddress(response.walletAddress));
      navigate("/");
    }
  }, [loginSuccessful, response, dispatch, navigate]);
  // <div className="container mx-auto px-4">
  //   <div className="w-full mx-auto py-16">
  return (
    <div className="w-full mx-auto py-16">
      <div className="flex bg-neutral-800 flex-col md:flex-row h-[70vh]">
        <div
          className="hidden md:block md:w-1/2 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${signInImage})` }}
        ></div>
        <div className="flex p-5 md:p-0 w-full h-full md:w-1/2 justify-center">
          <div className="w-full max-w-sm my-auto ">
            <h2 className="font-sans font-semibold text-white text-3xl mb-4 md:mb-8 md:text-4xl">
              Sign In
            </h2>
            <p className="font-sans text-neutral-400">Welcome back!</p>
            <Formik
              initialValues={{ usernameOrEmail: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, submitForm }) => (
                <Form className="bg-transparent pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="usernameOrEmail"
                      placeholder="Username / Email"
                      className="bg-[#2B2B2B] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                    />
                    <ErrorMessage
                      name="usernameOrEmail"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="mb-6">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-[#2B2B2B] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  {requestVerification && (
                    <div className="text-green-500 mb-2">
                      An email has been sent. Please check your email.
                    </div>
                  )}
                  {!requestVerification && loginError && (
                    <>
                      <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center"
                        role="alert"
                      >
                        <span className="font-medium">Signin Failed! </span>
                        {LoginErrorData?.data?.msg}
                      </div>
                      {LoginErrorData.data?.msg.includes("not verified") && (
                        <button
                          className="text-primary-dark px-3 py-1 mb-4 rounded"
                          onClick={() => {
                            setRequestVerification(true);
                            submitForm();
                          }}
                        >
                          Request email verification
                        </button>
                      )}
                    </>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full bg-primary-dark hover:bg-primary-main text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                    >
                      {loginLoading ? "Signing In..." : "Sign In"}
                    </button>
                  </div>
                  <a
                    className="text-gray-400 hover:text-gray-50"
                    href="/request-reset"
                  >
                    Forgot password?
                  </a>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
