import React from "react";
import Menu from "../Menu";

const Submenu = ({ menu }) => {
  let id = 1;
  return (
    <div>
      {Array.isArray(menu) &&
        menu.map((value) => {
          id++;
          return (
            <Menu
              name={typeof value === 'object' && value !== null ? value.name : value}
              link={typeof value === 'object' && value !== null ? value.link : value}
              key={id}
            />
          );
        })}
    </div>
  );
};

export default Submenu;
