import React, { useEffect, useState } from "react";
import { RiArrowLeftLine, RiEdit2Line } from "react-icons/ri"; // Import the pen icon
import {
  useChangePasswordMutation,
  useGetUserQuery,
  useUpdateProfileMutation,
} from "../../../stores/auth/authAPI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SpinLoader } from "../../../components/common/spinner/spinLoader";
import { getAssetContractInstance } from "../../../config/contractInstances";
import AssetCard from "../../marketPlace/Components/AssetCard";
import QRCode from "react-qr-code";
import AssetDetail from "../../marketPlace/Pages/AssetDetailPage";

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  nationalID: Yup.string().required("Legal ID No. is required"),
});

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("old password is required")
    .min(6, "Password must be at least 6 characters"),
  newPassword: Yup.string().required("New your password"),
});

const ProfileEdit = ({
  userData,
  setIsEditing,
  handleProfileSubmit,
  backendRegistrationLoading,
}) => {
  return (
    <div className="flex w-full mb-20 md:w-1/2 justify-center">
      <div className="w-full max-w-md px-6">
        <div className="flex items-center cursor-pointer space-x-4 mb-5">
          <RiArrowLeftLine
            onClick={() => setIsEditing(false)}
            aria-label="Back"
          />
          <h2 className="font-sans font-semibold text-white text-3xl">
            Profile
          </h2>
        </div>
        <Formik
          initialValues={userData}
          validationSchema={RegistrationSchema}
          onSubmit={handleProfileSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-transparent">
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  disabled
                  className="text-neutral-700 disabled:text-gray-500 border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="bg-[#313131] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
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
                  className="bg-[#313131] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mb-6">
                <Field
                  type="text"
                  name="nationalID"
                  placeholder="Legal ID No"
                  className="bg-[#313131] hover:bg-[#303030] border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
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
                className="w-full mt-5 mb-3 bg-primary-main hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {backendRegistrationLoading ? "Updating..." : "Update"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const ChangePassword = ({
  userData,
  setIsPasswordChange,
  handlePasswordSubmit,
  isLoading,
  isSuccess,
  error,
}) => {
  return (
    <div className="w-[40%] ">
      <div className="w-full p-8 rounded-lg shadow-lg">
        <div>
          <button onClick={() => setIsPasswordChange(false)}>Back</button>
          <h2 className="text-3xl font-semibold text-white mb-6">
            Change Your Password
          </h2>
          <Formik
            initialValues={userData}
            validationSchema={validationSchema}
            onSubmit={handlePasswordSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    className="bg-neutral-800 mb-4 text-white border-0 outline-none p-2 px-3 rounded w-full"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

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

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isLoading ? "Submitting" : "Submit"}
                </button>

                {isSuccess && (
                  <div className="mt-6 text-green-500">
                    Password has been successfully changed.
                  </div>
                )}

                {error && (
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

const ProfilePage = () => {
  const {
    data: userData,
    isLoading: isGettingUser,
    error,
    refetch,
  } = useGetUserQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [tabChange, setTabChange] = useState(false);
  const [userAssets, setUserAssets] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [
    updateProfile,
    { isLoading, data, isSuccess, isError, error: updateError },
  ] = useUpdateProfileMutation();

  const [
    changePassword,
    {
      isSuccess: isPasswordChanged,
      isLoading: isloadingPass,
      error: passwordError,
    },
  ] = useChangePasswordMutation();

  const tabs = [
    { label: "Pending" },
    { label: "Approved" },
    { label: "Declined" },
  ];

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    setTabChange(true);
    const fetchUserAssets = async () => {
      const [contract, contractWithSigner] = await getAssetContractInstance();
      const address = window.ethereum.selectedAddress;
      console.log("about to fetch new user assets")
      const userAssets = await contractWithSigner.getUserAssetsByFilter(
        address,
        activeTab
      );
      setTabChange(false);
      setUserAssets(userAssets);
      console.log('user assets',userAssets)
    };
    fetchUserAssets().then(() => console.log("done"));
  }, [activeTab]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  const handleProfileSubmit = (values) => {
    console.log("handleprofile", values);
    updateProfile({
      userId: values._id,
      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        nationalID: values.nationalID,
      },
    });

    setIsEditing(false);
  };

  const handlePasswordSubmit = (values) => {
    changePassword({
      userId: userData._id,
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
    });
    // setIsPasswordChange(false);
  };

  const openModal = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  if (isGettingUser) {
    return <SpinLoader />;
  }

  return (
    <div className="container mx-auto mt-8 mb-14">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="flex items-center mb-4 space-x-9"></div>
        {isEditing ? (
          <div className="flex-auto flex justify-center mt-8 w-full md:w-1/2 md:pr-4">
            <ProfileEdit
              userData={userData}
              setIsEditing={setIsEditing}
              handleProfileSubmit={handleProfileSubmit}
              backendRegistrationLoading={isLoading}
            />
            {/* {isPasswordChange && (
             
            )} */}
          </div>
        ) : isPasswordChange ? (
          <div className="flex justify-center w-full">
            <ChangePassword
              setIsPasswordChange={setIsPasswordChange}
              userData={userData}
              handlePasswordSubmit={handlePasswordSubmit}
              isLoading={isloadingPass}
              isSuccess={isPasswordChanged}
              error={passwordError}
            />
          </div>
        ) : userData?.roles?.includes("ADMIN") ? (
          <div className="flex-auto w-full md:w-1/2 md:pr-4">
            <div className="max-w-lg mx-auto p-3 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://avatar.iran.liara.run/public/boy?username=Ash"
                    alt={`${userData?.firstName} ${userData?.lastName}`}
                    className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
                  />
                </div>
                <div className="flex-grow p-32">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {userData?.firstName} {userData?.lastName}
                    </h3>
                    {!isEditing && (
                      <span className="text-gray-500 p-32">
                        Edit Profile
                        <RiEdit2Line
                          className="text-primary-main bg-red-400 items-end inline m-3 cursor-pointer"
                          size={20}
                          onClick={handleEditClick}
                        />
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{userData?.email}</p>
                  <p className="text-gray-500">ID: {userData?.nationalID}</p>
                  <p className="text-gray-500 break-all">
                    Wallet: {userData?.walletAddress}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-start">
                {userData?.roles?.map((role, index) => (
                  <span
                    key={index}
                    className="inline-block bg-purple-300 text-purple-800 text-xs font-semibold mr-2 px-3 py-1 rounded-full"
                  >
                    {role.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto mt-8 mb-14">
            <div className="flex justify-center space-x-10 items-center w-full bg-neutral-800 py-10">
              <div className="flex justify-center flex-col items-center space-y-4">
                <img
                  src="https://avatar.iran.liara.run/public/boy?username=Ash"
                  alt={`${userData?.firstName} ${userData?.lastName}`}
                  className="h-60 w-30 rounded-full object-cover border-2 border-gray-300"
                />
                {!isEditing && (
                  <div
                    onClick={handleEditClick}
                    className="text-gray-500 flex justify-center items-center space-x-1 cursor-pointer"
                  >
                    <p> Edit Profile</p>
                    <RiEdit2Line
                      className="text-primary-main items-end inline"
                      size={20}
                    />
                  </div>
                )}
                {!isPasswordChange && (
                  <div
                    onClick={() => setIsPasswordChange(true)}
                    className="text-gray-500 flex justify-center items-center space-x-1 cursor-pointer"
                  >
                    <p> Change password?</p>
                    <RiEdit2Line
                      className="text-primary-main items-end inline"
                      size={20}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-around items-center space-x-60">
                <div>
                  <h3 className="text-5xl font-bold text-gray-100 uppercase">
                    {userData?.firstName} {userData?.lastName}
                  </h3>
                  <p className="text-gray-400 text-base my-3">
                    {userData?.email}
                  </p>
                  <p className="text-gray-400 text-base mb-6">
                    Legal ID: {userData?.nationalID}
                  </p>
                  {userData?.roles?.map((role, index) => (
                    <span
                      key={index}
                      className="inline-block bg-purple-200 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full"
                    >
                      {role.toUpperCase()}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="flex justify-center items-center">
                    <QRCode
                      style={{
                        border: "2px solid #6b21a8",
                        borderRadius: 10,
                        borderColor: "#6b21a8",
                        padding: 10,
                      }}
                      bgColor="transparent"
                      fgColor="#6b21a8"
                      size={150}
                      eyeRadius={[20, 20, 20, 20]}
                      value={userData?.walletAddress || ""}
                    />
                    <div className="text-gray-500 text-xl px-4 font-bold">
                      Wallet Address
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <p className="text-gray-400 text-base">
                      {userData?.walletAddress}
                    </p>
                    <button
                      onClick={() => copyToClipboard(userData?.walletAddress)}
                      className="bg-purple-800 text-white text-xs py-1.5 px-3 rounded focus:outline-none focus:shadow-outline"
                    >
                      {isCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="p-6 shadow rounded-lg">
                <h4 className="text-3xl font-bold my-10 mb-5">My Assets</h4>
                <div className="rounded-lg shadow-md p-6">
                  <div className="flex justify-around mb-4">
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        className={`py-2 w-full px-4 font-medium focus:outline-none ${
                          activeTab === index
                            ? "text-purple-600 border-b-2 border-purple-600"
                            : "text-gray-500 hover:text-gray-300"
                        }`}
                        onClick={() => setActiveTab(index)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                {tabChange && (
                  <div className="min-h-52">
                    <SpinLoader />
                  </div>
                )}
                {!tabChange && userAssets?.length > 0 && (
                  <div className="flex">
                    {userAssets.map((asset, index) => {
                      return (
                        <div
                          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                          key={index}
                        >
                          <AssetCard
                            asset={asset}
                            openModal={openModal}
                            isMyAsset={true}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
                {isModalOpen && (
                  <AssetDetail asset={selectedAsset} onClose={closeModal} />
                )}
                {userAssets?.length === 0 && (
                  <p>You currently have no assets.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
