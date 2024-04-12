import React, { useEffect, useState } from "react";
import { RiArrowLeftLine, RiEdit2Line } from "react-icons/ri"; // Import the pen icon
import { useGetUserQuery } from "../../../stores/auth/authAPI";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProfilePage = () => {
  const { data: userData, isLoading: isGettingUser, error } = useGetUserQuery();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ ...userData });
  console.log(editedUserData, "userdata");
  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string().required("Full Name is required"),
    lastName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    nationalID: Yup.string().required("Legal ID No. is required"),
  });
  useEffect(() => {
    setEditedUserData(userData);
  }, [userData]);

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
    return <div>Loading...</div>;
  }

  console.log(userData, "user dat");

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto p-6">
        <div className="flex items-center mb-4 space-x-9">
          {isEditing && (
            <div className="flex items-center cursor-pointer space-x-4">
              <RiArrowLeftLine onClick={() => setIsEditing(false)} />
              <h2 className="text-lg font-semibold mr-2">Profile</h2>
            </div>
          )}
          {!isEditing && (
            <RiEdit2Line
              className="text-primary-main items-end w-full cursor-pointer"
              size={20}
              onClick={handleEditClick}
            />
          )}
        </div>
        {isEditing ? (
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
        ) : (
          <div>
            <div className="mb-1">
              <h2 className="text-3xl">
                {userData.firstName} {userData.lastName}
              </h2>
            </div>
            <div className="mb-4 text-neutral-500">{userData.email}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
