import React, {  useState } from "react";
import Navbar from "../Nav/Navbar";
import Sidebar from "../Nav/Sidebar";

const Base = ({ children, baseStyle }) => {
  const [sidebarStatus, setSidebarStatus] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarStatus(!sidebarStatus);
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex w-full h-full overflow-hidden flex-row">
        <Sidebar status={sidebarStatus} />
        <div
          className={`lg:w-[82%] w-[100%]  bg-[#F7FAFC] overflow-y-auto pb-6`}
          style={baseStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Base;