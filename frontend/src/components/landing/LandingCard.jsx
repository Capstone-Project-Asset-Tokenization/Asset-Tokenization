import React from "react";

const LandingCard = ({ title, description }) => {
  return (
    <div className="basis-1/3 bg-background-secondary text-center rounded-lg px-8 py-6">
      <img
        src="\src\assets\icon.png"
        alt="Card Image"
        className="rounded-full  h-44 mx-auto mb-4"
      />
      <h6 className="font-bold text-xl mb-4">{title}</h6>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
};

export default LandingCard;
