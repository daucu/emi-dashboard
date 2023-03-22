import React, { } from "react";
import { HiMenu } from "react-icons/hi";
import { TbRotate360 } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoNotificationsSharp } from "react-icons/io5";

const Navbar = ({ toggleSidebar }) => {

  return (
    <div style={{ position: "sticky", top: 0, left: 0, zIndex: 45 }}>
      <div className="w-full top-0 z-20 flex flex-row flex-wrap items-center bg-[#eaeaea] p-4 border-b border-gray-300 h-full justify-between">
        <div className="flex items-center justify-between">
          <div className="flex-none   flex flex-row items-center justify-between">
            <button
              className="lg:hidden "
              aria-label="delete"
              size="large"
              onClick={toggleSidebar}
            >
              <HiMenu size={25} className="lg:hidden cursor-pointer" />
            </button>

            <div>
              <Link to="/">
                <strong className="flex items-center text-[22px] font-sans  capitalize ml-1 flex-1">
                  Angler 360 <TbRotate360 className="ml-2" />
                </strong>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex  items-center float-right justify-end cursor-pointer mr-2">
          {/* <Link to="#">
            <div className="bg-white flex justify-center mr-4 items-center w-10 h-10 rounded-full">
              <IoNotificationsSharp
                size={20}
                color="#32A8F1"
                className="w-full   rounded-full"
              />
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;