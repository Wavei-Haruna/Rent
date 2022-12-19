import React from "react";
import SpinnerSvg from "../assets/svgs/spinner.svg";

export default function Spinner() {
  return (
    <div className=" fixed flex top-0 left-0 right-0 bottom-0 items-center justify-center">
      <img className="h-24" src={SpinnerSvg} alt="Loading..." />
    </div>
  );
}
