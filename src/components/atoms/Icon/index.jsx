import React from "react";
import FeatherIcon from "feather-icons-react";

const Icon = ({ icon, notification, onClick, children }) => {
  const addStyle = notification ? "" : "mr-4";
  return (
    <>
      <FeatherIcon
        icon={icon}
        size={18}
        className={`bg-gray-100 rounded-full w-[30px] h-[30px] p-[7px] cursor-pointer ${addStyle}`}
        onClick={onClick}
      />
      {notification && (
        <sup className="inline-flex items-center justify-center px-[5px] h-[18px] -ml-3 mr-2 text-[9px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {notification}
        </sup>
      )}
      {children}
    </>
  );
};

export default Icon;
