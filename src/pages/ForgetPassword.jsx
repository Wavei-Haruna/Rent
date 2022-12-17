import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import LogInImage from "../assets/Images/login.png";
import Aouth from "../Components/Aouth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState();

  // end of state variables
  const onChange = (e) => {
    // the setFormData function below is taking each record and adding it to the target value
    //
    setEmail(e.target.value);
  };
  // on submit function
  async function formSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("reset link sent");
    } catch (error) {
      toast.error("oops something went wrong");
    }
  }

  return (
    <section className="h-full">
      <h1 className="text-center text-primary font-semibold md:text-4xl text-2xl pt-8">
        Reset Password
      </h1>
      <div className="grid  md:grid-cols-2 h-full w-full py-3 px-4 max-w-6xl mx-auto">
        {/* Login image */}
        <img src={LogInImage} alt="" className="mb-10 cursor-pointer" />
        <div className=" md:ml-10 py-8 px-6 bg-blue-100 h-fit md:mt-16">
          {/* form */}
          <form onSubmit={formSubmit}>
            <input
              className=" w-full px-4 mb-3 rounded-md shadow-sm border-gray-500  "
              type="email"
              id="email"
              value={email}
              placeholder="enter your Email"
              onChange={onChange}
            />

            <div className=" flex justify-between items-center mb-3 ">
              <p>
                Don't have an account
                <Link
                  to="/sing-up"
                  className="text-primary ml-1 font-semibold  cursor-pointer"
                >
                  Register
                </Link>
              </p>
              <p className="text-blue-700 cursor-pointer">
                <Link to="/Forget-password">Sign instead</Link>
              </p>
            </div>
            <input
              type="submit"
              className="bg-blue-700 w-full py-2 mb-3 text-white font-semibold
            rounded-md  cursor-pointer"
            />
            <div
              className=" my-3 flex items-center before:border-t before:border-gray-500  after:border-gray-500 before:flex-1 
            after:flex-1 after:border-t"
            >
              <p className="text-center px-4"> or continue with</p>
            </div>
            <Aouth />
          </form>
        </div>
      </div>
    </section>
  );
}
