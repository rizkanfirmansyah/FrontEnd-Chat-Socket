import { Menu } from "../../atoms";
import Submenu from "../../atoms/Submenu";

const Sidebar = () => {
  return (
    <aside className="w-2/12 h-screen sticky overflow-scroll  align-middle bg-white top-0 ">
      <h1 className="text-xl font-bold p-6">Logo Company</h1>
      <ul className="pt-0 space-y-1">
        <Menu name="Dashboard" icon="home"/>
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
        <Menu name="List" icon="list" />
      </ul>
    </aside>
  );
};

export default Sidebar;
