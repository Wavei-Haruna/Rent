import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../assets/Images/user.png";
import { MdOutlineMenuOpen, MdOutlineRestaurantMenu } from "react-icons/md";
useLocation;
import SimpliRent from "../assets/Images/simplirent.png";

export default function Navbar() {
  const Location = useLocation();
  const Navigate = useNavigate();
  const auth = getAuth();

  // hooks
  const [pageStatus, setPageStatus] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    setPageStatus(false);
    onAuthStateChanged(auth, (user) => {
      if (user) setPageStatus(true);
    });
  });

  const PathName = (routes) => {
    if (routes === Location.pathname) return true;
  };
  return (
    <div className=" border-b bg-white  z-50 shadow-sm sticky top-0">
      <header className=" md:flex justify-between  items-center  max-w-6xl mx-auto p-1 ">
        <div className="w-full flex items-center justify-between">
          <img
            className="h-10  cursor-pointer "
            src={SimpliRent}
            alt="Logo"
            onClick={() => Navigate("/")}
          />
          <div>
            {menu ? (
              <MdOutlineMenuOpen
                className=" md:hidden text-primary  text-2xl mr-8 transition duration-500 cursor-pointer ease-in-out "
                onClick={() => setMenu(!menu)}
              />
            ) : (
              <MdOutlineRestaurantMenu
                className="  text-2xl md:hidden cursor-pointer text-primary mr-8 transition duration-500 ease-in-out"
                onClick={() => setMenu(!menu)}
              />
            )}
          </div>
        </div>

        <div
          className={`duration-300 ease-out transition   w-full px-4 ${
            menu && "hidden md:block"
          }`}
        >
          <ul
            className={`menu flex  md:space-x-10 md:space-y-0    md:items-center  items-end flex-col md:flex-row justify-center 
            }`}
          >
            <li
              className={`cursor-pointer py-2 font-semibold text-[#666666] border-b-2 border-b-transparent ${
                PathName("/") && "border-b-gray-500 text-black w-fit"
              }`}
              onClick={() => Navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-2 font-semibold text-[#666666] border-b-2 border-b-transparent ${
                PathName("/offers") && "border-b-gray-500 text-black w-fit"
              }`}
              onClick={() => Navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-2 font-semibold text-[#666666] border-b-2 border-b-transparent px-0 ${
                (PathName("/sign-in") || PathName("/profile")) &&
                "border-b-gray-500 text-black w-fit"
              }`}
              onClick={() => Navigate("/profile")}
            >
              {pageStatus ? (
                <img src={user} className="h-10 rounded-full" />
              ) : (
                <p>Sign in</p>
              )}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
