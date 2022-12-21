import React from "react";

const Dropdown = ({addClass, children}) => {
  return (
    <div className={`origin-top-right rounded-md absolute top-12 bg-white px-6 py-3 ${addClass}`}>
      {children}
    </div>
  );
};

export default Dropdown;
