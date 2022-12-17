import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Aouth() {
  return (
    <div>
      <button className="w-full rounded-md py-3 bg-primary text-white flex items-center  justify-center">
        <FcGoogle className="mr-2 text-2xl" /> Google
      </button>
    </div>
  );
}
