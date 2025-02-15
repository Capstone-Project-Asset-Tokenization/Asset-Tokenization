import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import signUpImage from "../../../assets/login_image.png";
import { useRegisterMutation } from "../../../stores/auth/authAPI";
import { useNavigate } from "react-router-dom";
import ConnectWallet from "./ConnectWalet";
import {
  getUserContractInstance,
  getAssetContractInstance,
} from "../../../config/contractInstances";

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  nationalID: Yup.string().required("Legal ID No. is required"),
});

const Registration = () => {
  let navigate = useNavigate();

  let [section, setSection] = React.useState(0);
  let [walletAddress, setWalletAddress] = React.useState(null);
  let [values, setValues] = React.useState(null);
  let [smartContractRegistrationError, setSmartContractRegistrationError] =
    React.useState("");
  let [
    smartContractRegistratonErrorResponse,
    setSmartContractRegistratonErrorResponse,
  ] = React.useState("");

  let [bcRegisterationState, setBCRegisterationState] = React.useState({
    loading: false,
  });
  const [
    register,
    {
      isLoading: backendRegistrationLoading,
      isSuccess: backendRegistrationSucess,
      isError: backendRegistrationError,
      error: registratonBKErrorResponse,
    },
  ] = useRegisterMutation();
  console.log("registrationSucess", backendRegistrationSucess);
  console.log("registrationBKError", backendRegistrationError);
  console.log("registratonBKErrorResponse", registratonBKErrorResponse);
  let registrationError =
    backendRegistrationError || smartContractRegistrationError;
  let registrationErrorResponse =
    registratonBKErrorResponse || smartContractRegistratonErrorResponse;
  const handleProfileSubmit = async (values, { setSubmitting }) => {
    setSection(1);
    setValues(values);
  };

  const handleSubmit = (wallet) => {
    delete values.confirmPassword;
    register({ ...values, walletAddress: wallet });
  };

  const handleBack = () => {
    setSection(0);
  };

  const handleBlockChainRegistration = async () => {
    if (backendRegistrationSucess) {
      let [userContract, userContractwithSigner] =
        await getUserContractInstance();

      try {
        setBCRegisterationState({
          loading: true,
        });
        let response = await userContractwithSigner.registerUser();
        console.log("user registration response", response);
        navigate("/signin");
      } catch (error) {
        setBCRegisterationState({
          loading: false,
        });
        console.log("user registration error", error);
        // registrationError = true
        setSmartContractRegistrationError(true);
        setSmartContractRegistratonErrorResponse(
          error.reason ? error.reason : "Error registering user on blockchain"
        );
      }
    }
  };

  useEffect(() => {
    handleBlockChainRegistration();
  }, [backendRegistrationSucess]);
  return (
    <div>
      <ol className="lg:flex items-center w-full space-y-4 space-x-9 lg:space-y-0">
        <li className=" flex-1">
          <div
            onClick={() => setSection(0)}
            className="border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid border-purple-600 font-medium lg:pt-4 lg:border-t-2 lg:border-l-0 lg:pl-0"
          >
            <span className="mx-6 text-sm lg:text-base text-purple-300">
              Step 1
            </span>
            <h4 className=" mx-6 text-sm text-gray-400">Create Account</h4>
          </div>
        </li>
        <li className=" flex-1">
          {section == 1 && (
            <div className="border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid border-purple-400 font-medium lg:pt-4 lg:border-t-2 lg:border-l-0 lg:pl-0">
              <span className="text-sm lg:text-base text-purple-300">
                Step 2
              </span>

              <h4 className="text-sm text-gray-400">Connect Wallet</h4>
            </div>
          )}
        </li>
      </ol>

      {section == 0 && (
        <div className="flex">
          {/* Image Section */}
          <div
            className="hidden md:block md:w-1/2 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${signUpImage})` }}
          ></div>

          {/* Form Section */}
          <div className="flex w-full mb-20 md:w-1/2 justify-center">
            <div className="w-full max-w-md px-6 ">
              <h2 className="font-sans font-semibold pb-5 text-white text-3xl ">
                Create Account
              </h2>
              <p className="font-sans text-neutral-400 mb-6">
                Welcome! Enter your details and start creating, collecting and
                selling assets.
              </p>
              <Formik
                initialValues={
                  values
                    ? values
                    : {
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        nationalID: "",
                      }
                }
                validationSchema={RegistrationSchema}
                onSubmit={handleProfileSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="bg-transparent">
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="bg-[#292929] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="bg-[#292929] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="mb-4">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="bg-[#292929] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="mb-4">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="bg-[#292929] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="mb-4">
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="bg-[#292929] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="mb-6">
                      <Field
                        type="text"
                        name="nationalID"
                        placeholder="Legal ID No"
                        className="bg-[#292929] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                      />
                      <ErrorMessage
                        name="nationalID"
                        component="div"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={backendRegistrationLoading}
                      className="w-full mt-4 bg-primary-dark hover:bg-primary-main text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {backendRegistrationLoading ? "Registering..." : "Next"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      {section == 1 && (
        <div>
          <ConnectWallet
            handleback={handleBack}
            handleSubmit={handleSubmit}
            setWallet={setWalletAddress}
            registrationLoading={
              backendRegistrationLoading || bcRegisterationState.loading
            }
            registrationError={registrationError}
            registratonErrorResponse={smartContractRegistratonErrorResponse}
            registratonBKErrorResponse={registratonBKErrorResponse}
            smartContractRegistratonErrorResponse={
              smartContractRegistratonErrorResponse
            }
          />
        </div>
      )}
    </div>
  );
};

export default Registration;
