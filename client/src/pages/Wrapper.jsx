import React, { useState } from "react";
import UserNavigation from "../components/skeleton/UserNavigation";
import Sidebar from "../components/skeleton/Sidebar";

const Wrapper = ({ children }) => {
  const [side, setSide] = useState("-left-64");

  const openSidebar = () => {
    setSide("left-0");
  };

  const closeSidebar = () => {
    setSide("-left-64");
  };

  return (
    <>
      <Sidebar side={side} closeSidebar={closeSidebar} />
      <UserNavigation openSidebar={openSidebar} />
      <section className="ml-0 sm:ml-64 min-h-screen pt-28  b-tekin">
        <div className=" text-white p-4">{children}</div>
      </section>
    </>
  );
};

export default Wrapper;
