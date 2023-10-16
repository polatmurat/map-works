import React from "react";
import { BsHandbag } from "react-icons/bs";
import { BiHomeAlt2 } from "react-icons/bi";
import { PiSignInDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full h-[70px] flex items-center shadow-md fixed top-0 right-0 left-0 z-50 bg-white/20 bg-opacity-5">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link to="/">
            {/* <img
              src="./logo.jpg"
              className="h-[70px] w-[130px] rounded-md object-cover"
              alt="logo"
            /> */}
            <h1>Map Works</h1>
          </Link>
          <ul className="flex items-center">
            <li className="nav__item cursor-pointer">
              <BiHomeAlt2 size={22} />
            </li>
            {/* <li className="nav__item text-black">
              <Link to="/login" className="nav__link">
                Sign In
              </Link>
            </li> */}
            {false ? (
              <li className="nav__item text-black">
                <Link to="/user" className="nav__link">
                  {user?.name}
                </Link>
              </li>
            ) : (
              <li className="nav__item text-black">
                <Link
                  to="/login"
                  className="nav__link flex justify-center items-center"
                >
                  <div className="mr-1">Sign In</div>
                  <PiSignInDuotone className="-mb-1" size={21} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
