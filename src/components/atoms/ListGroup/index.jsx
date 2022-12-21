import React from "react";

const ListGroup = ({name, description, date, img}) => {
  return (
    <>
      <li className="hover:bg-gray-100 cursor-pointer px-6 py-3">
        <div className="flex space-x-2">
          <img src={img} alt="profile notifications" className="w-[50px] h-[50px] rounded-full" />
          <div>
            <h1 className="text-md font-medium">{name}</h1>
            <p className="text-sm text-gray-700">{description}</p>
            <span className="text-[10px] text-gray-400">{date} day ago</span>
          </div>
        </div>
      </li>
    </>
  );
};

export default ListGroup;
