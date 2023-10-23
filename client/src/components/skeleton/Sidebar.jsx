import React from "react";
import {
  BsCardList,
  BsBagCheck,
  BsPeople,
  BsXCircle,
  BsBarChart,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({ side, closeSidebar }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed z-10 top-0 ${side} sm:left-0  w-64 h-screen bg-epalette1 transition-all ease-in-out duration-200`}
    >
      <div>
        <img src="/images/logo.png" onClick={() => navigate('/dashboard')} className="cursor-pointer" alt="Logo" />
        {/* <h1 className="text-white p-7">Quality</h1> */}
      </div>
      <ul className="">
        <li className="px-4 py-3 transition-all text-white flex items-center justify-center sm:hidden">
          <BsXCircle
            className="mr-2 text-3xl inline-block cursor-pointer"
            onClick={closeSidebar}
          />
        </li>
        <li className="px-4 py-5 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
          <BsCardList className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/products" className="text-base capitalize">
            Places
          </Link>
        </li>
        <li className="px-4 py-5 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
          <BsBagCheck className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/products" className="text-base capitalize">
            Orders
          </Link>
        </li>
        <li className="px-4 py-5 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
          <BsPeople className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/products" className="text-base capitalize">
            Customers
          </Link>
        </li>
        <li className="px-4 py-5 cursor-pointer transition-all text-white flex items-center hover:bg-gray-600">
          <BsBarChart className="mr-2 text-lg inline-block" />
          <Link to="/dashboard/categories" className="text-base capitalize">
            Categories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
