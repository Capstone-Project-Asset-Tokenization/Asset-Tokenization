import React, { useEffect, useState } from "react";
import { RiArrowLeftLine, RiEdit2Line } from "react-icons/ri"; // Import the pen icon
import { useGetUserQuery } from "../../../stores/auth/authAPI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SpinLoader } from "../../../components/common/spinner/spinLoader";

const ProfilePage = () => {
  const {
    data: userData,
    isLoading: isGettingUser,
    error,
    refetch,
  } = useGetUserQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userData });

  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Full Name is required"),
    lastName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    nationalID: Yup.string().required("Legal ID No. is required"),
  });

  const userAssets = [];
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfileSubmit = (e) => {
    console.log("handleprofile");
  };

  const handleSaveClick = () => {
    setIsEditing(false); // Update userData with edited data
  };

  if (isGettingUser) {
    return <SpinLoader />;
  }

  return (
    <div className="container mx-auto mt-8 mb-14">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="flex items-center mb-4 space-x-9"></div>
        {isEditing ? (
          <div className="max-w-lg mx-auto  p-3 rounded-lg shadow">
            <div className="flex items-center cursor-pointer space-x-4">
              <RiArrowLeftLine onClick={() => setIsEditing(false)} />
              <h2 className="text-lg font-semibold mr-2">Profile</h2>
            </div>
            <Formik
              initialValues={{
                ...userData,
              }}
              validationSchema={RegistrationSchema}
              onSubmit={handleProfileSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="bg-transparent">
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="Frist Name"
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

                  <div className="mb-4">
                    <Field
                      disabled
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="bg-[#292929] text-neutral-700 border-0 outline-none active:bg-[#343434] p-2 px-3 rounded w-full"
                    />
                    <ErrorMessage
                      name="email"
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
                    disabled={true}
                    className="w-full bg-neutral-700 text-neutral-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Update
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        ) : userData.roles.includes("ADMIN") ? (
          <div className="flex-auto w-full md:w-1/2 md:pr-4">
            <div className="max-w-lg mx-auto  p-3 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src="https://avatar.iran.liara.run/public/boy?username=Ash"
                    alt={`${userData?.firstName} ${userData?.lastName}`}
                    className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
                  />
                </div>
                <div className="flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {userData?.firstName} {userData?.lastName}
                    </h3>
                    {!isEditing && (
                      <span className="text-gray-500">
                        Edit Profile
                        <RiEdit2Line
                          className="text-primary-main items-end inline  m-3 cursor-pointer"
                          size={20}
                          onClick={handleEditClick}
                        />
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{userData?.email}</p>
                  <p className="text-gray-500">ID: {userData?.nationalID}</p>
                  <p className="text-gray-500  break-all">
                    Wallet: {userData?.walletAddress}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-start">
                {userData?.roles.map((role, index) => (
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
            <div className="flex flex-wrap md:flex-nowrap">
              <div className="flex-auto w-full md:w-1/2 md:pr-4">
                <div className="max-w-lg mx-auto  p-3 rounded-lg shadow">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src="https://avatar.iran.liara.run/public/boy?username=Ash"
                        alt={`${userData?.firstName} ${userData?.lastName}`}
                        className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
                      />
                    </div>
                    <div className="flex-grow">
                      <div>
                        <h3 className="text-xl font-semibold">
                          {userData?.firstName} {userData?.lastName}
                        </h3>
                        {!isEditing && (
                          <span className="text-gray-500">
                            Edit Profile
                            <RiEdit2Line
                              className="text-primary-main items-end inline  m-3 cursor-pointer"
                              size={20}
                              onClick={handleEditClick}
                            />
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500">{userData?.email}</p>
                      <p className="text-gray-500">
                        ID: {userData?.nationalID}
                      </p>
                      <p className="text-gray-500  break-all">
                        Wallet: {userData?.walletAddress}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-start">
                    {userData?.roles.map((role, index) => (
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
              <div className="flex-auto w-full md:w-1/2 md:pl-4 mt-4 md:mt-0">
                <div className="p-6 shadow rounded-lg">
                  <h4 className="text-lg font-bold mb-4">Your Assets</h4>
                  {userAssets.length > 0 ? (
                    <ul>
                      {userAssets.map((asset, index) => (
                        <li key={index} className="mb-2">
                          {asset.name} - {asset.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>You currently have no assets.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
