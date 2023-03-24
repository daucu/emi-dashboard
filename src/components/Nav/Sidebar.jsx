import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineUser
} from "react-icons/ai";

import { RxDashboard } from "react-icons/rx";
import { MdDevicesOther } from "react-icons/md";
import { BsShopWindow } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";

const Sidebar = ({ status }) => {
  return (
    <div
      id="sideBar"
      className={`${
        status && "max-lg:hidden"
      } z-[100] relative top-0 flex flex-col flex-wrap border-r border-gray-300 px-3 py-2 lg:w-[18%] h-[100%] animated faster overflow-y-scroll overflow-x-hidden
    max-lg:fixed max-lg:top-[68px] max-lg:pb-[68px] w-[250px] left-0 bg-white
    `}
    >
      <div className="flex flex-col ">
        <Link
          to="/"
          className="nav_link"
        >
          <RxDashboard
            size={20}
            className={"mr-3 hover:text-inherit"}
          />
          Dashboard
        </Link>

        <Link
          to="/users"
          className="nav_link"
        >
          <AiOutlineUser size={20} className={"mr-3 hover:text-inherit"} />
          Users
        </Link>
        <Link
          to="/sellers"
          className="nav_link"
        >
          <BsShopWindow size={20} className={"mr-3 hover:text-inherit"} />
          Sellers
        </Link>
       
        <Link
          to="/devices"
          className="nav_link"
        >
          <MdDevicesOther size={20} className={"mr-3 hover:text-inherit"} />
          Devices
        </Link>
        <Link
          to="/transactions"
          className="nav_link"
        >
          <MdDevicesOther size={20} className={"mr-3 hover:text-inherit"} />
          Transactions
        </Link>
        <Link
          to="/support"
          className="nav_link"
        >
          <BiSupport size={20} className={"mr-3 hover:text-inherit"} />
          Support
        </Link>
        {/* users */}
        {/* <p className="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">
          Users
        </p> */}
        
      </div>
    </div>
  );
};

export default Sidebar;