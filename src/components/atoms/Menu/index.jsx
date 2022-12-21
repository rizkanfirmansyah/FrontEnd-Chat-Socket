/* eslint-disable no-mixed-operators */
import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";

const Menu = ({ name, icon, active, link, inactive, children }) => {
  const [status, setStatus] = useState(false);
  const [Default, setDefault] = useState(active);
  function changeStatus(name) {
    setStatus(status ? false : true);
    setDefault(false);
  }

  const history = useNavigate();

  const listActive =  "hover:bg-blue-100 hover:rounded-md hover:text-blue-800 hover:font-semibold ";
  const iconActive =  "hover:chevron-down chevron-right";
  const subMenuActive =  "hover:block hidden";

  return (
    <div onClick={() => (children ? "" : history(`/${link ? link : name.toLowerCase()}`))} className='cursor-pointer'>
      <li className={`flex p-3 py-5 justify-between ${listActive} `} onClick={() => changeStatus(name)}>
        <button className={`flex`}>
          {icon && <FeatherIcon className="my-auto mr-3" icon={icon} size="16" />}
          {name}
        </button>
        {children && <FeatherIcon className="my-auto" icon={iconActive} size="16" />}
      </li>
      {children && <div className={`pl-10 ${subMenuActive}`}>{children}</div>}
      <hr />
    </div>
  );
};

export default Menu;
