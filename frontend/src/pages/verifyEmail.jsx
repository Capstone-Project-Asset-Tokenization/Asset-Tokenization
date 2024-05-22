import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyUserEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const handle = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const emailToken = params.get("emailToken");
        const response = await axios.patch(
          "http://localhost:5001/api/user/verifyemail",
          {
            emailToken: emailToken,
          }
        );

        if (response.data.isVerified === true) {
          setIsVerified(true);
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    handle();
  }, [location.search, navigate]);

  return (
    <div className="bg-neutral-800 flex justify-center items-center text-gray-200 h-[70vh]">
      {isVerified ? (
        <h1 className="text-green-500">Your email has been verified</h1>
      ) : (
        <h1>Verifying your email...</h1>
      )}
    </div>
  );
}

export default VerifyUserEmail;
