import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
useLocation;
import SimpliRent from "../assets/Images/simpliRent.png";

export default function Navbar() {
  const Location = useLocation();
  const Navigate = useNavigate();
  const auth = getAuth();

  // hooks
  const [pageStatus, setPageStatus] = useState("sign in");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setPageStatus("Profile");
      else setPageStatus("Sign In");
    });
  }, [auth]);

  const PathName = (routes) => {
    if (routes === Location.pathname) return true;
  };
  return (
    <div className=" border-b bg-white  z-50 shadow-sm sticky top-0">
      <header className=" flex justify-between items-center p-4 max-w-6xl mx-auto ">
        <div>
          <img
            className="h-8 cursor-pointer"
            src={SimpliRent}
            alt="Logo"
            onClick={() => Navigate("/")}
          />
        </div>
        <div>
          <ul className="menu flex  space-x-10 ">
            <li
              className={`cursor-pointer py-2 font-semibold text-[#666666] border-b-2 border-b-transparent ${
                PathName("/") && "border-b-gray-500 text-black"
              }`}
              onClick={() => Navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-2 font-semibold text-[#666666] border-b-2 border-b-transparent ${
                PathName("/offers") && "border-b-gray-500 text-black"
              }`}
              onClick={() => Navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-2 font-semibold text-[#666666] border-b-2 border-b-transparent ${
                (PathName("/sign-in") || PathName("/profile")) &&
                "border-b-gray-500 text-black"
              }`}
              onClick={() => Navigate("/profile")}
            >
              {pageStatus}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
