import React from "react";

const Card = ({label, children}) => {
  return (
    <div className="w-full h-screen bg-gray-200 shadow-sm p-8 rounded-md">
      <div className="bg-white -m-8 mb-10 p-6">
        <h1 className="text-xl font-medium mb-6">{label}</h1>
      </div>
      {children}
    </div>
  );
};

export default Card;
