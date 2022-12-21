import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { Dropdown, Icon, Menu } from "../../atoms";
import { profile } from "../../../assets";
import ListGroup from "../../atoms/ListGroup";

const Navbar = () => {
  const [addClass, setAddClass] = useState(false);
  const [addClassNotif, setAddClassNotif] = useState(false);

  return (
    <nav className="px-10 py-5 flex space-x-5">
      <h1 className="font-semibold text-xl my-auto">Add Appointment</h1>
      <div className="inline-flex w-4/12 justify-end">
        <input type="text" placeholder="Search..." className="bg-gray-200 px-6 py-3 text-sm rounded-full w-10/12 focus:border-2 focus:border-blue-400" />
        <button type="button" className="text-sm bg-transparent -ml-10">
          <FeatherIcon icon="search" size={16} className="text-gray-400" />
        </button>
      </div>
      <div className="inline-flex my-auto w-4/12 justify-end">
        <Icon icon="clock" />
        <Icon icon="info" />
        <Icon icon="bell" notification="10" onClick={() => setAddClassNotif(addClassNotif === false ? true : false)} />
        <Dropdown addClass={addClassNotif === false ? "hidden" : "inline-block w-4/12 py-6 mt-5 shadow-sm"}>
          <h1>Notifications</h1>
          <ul className="-mx-6 mt-3">
            <hr />
            <ListGroup name="Rizkan Firmansyah" description="Memperbaharui haraga barang today" date="1" img={profile} />
            <ListGroup name="Rizkan Firmansyah" description="Memperbaharui haraga barang today" date="1" img={profile} />
            <ListGroup name="Rizkan Firmansyah" description="Memperbaharui haraga barang today" date="1" img={profile} />
            <ListGroup name="Rizkan Firmansyah" description="Memperbaharui haraga barang today" date="1" img={profile} />
          </ul>
          <div className="text-center text-gray-400 -mx-6 cursor-pointer">
          <hr className="mb-3" />
            <span className="text-sm">View All</span>
          </div>
        </Dropdown>
      </div>
      <div
        className="w-2/12 justify-end inline-flex cursor-pointer"
        onClick={() => setAddClass(addClass === false ? true : false)}
      >
        <img src={profile} className="h-[40px]" alt="ini gmabar profile" />
        <div className="ml-3 space-y-1">
          <h2 className="text-sm">Administrator</h2>
          <h2 className="text-xs text-gray-400">admin</h2>
        </div>

        <Dropdown addClass={addClass === false ? "hidden" : "inline-block w-full"}>
          <ul className="">
            <Menu name="Profile" icon="user" inactive />
            <Menu name="Settings" icon="settings" inactive />
            <hr />
            <Menu name="Logout" icon="log-out" />
          </ul>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
