import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import LogInImage from "../assets/Images/login.png";
import Aouth from "../Components/Aouth";
//firebase authentications libraries
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function SignIn() {
  const [showpassword, setPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //
  const navigate = useNavigate();
  // form submission
  async function formSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
        toast.success("login succces");
      }
    } catch (error) {
      toast.error("oops there is an error");
    }
  }

  const { email, password } = formData;
  // end of state variables
  const onChange = (e) => {
    // the setFormData function below is taking each record and adding it to the target value
    //
    setFormData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
    console.log(e.target.id);
  };

  return (
    <section className="h-full">
      <h1 className="text-center text-primary font-semibold md:text-4xl text-2xl pt-8">
        Sign In
      </h1>
      <div className="grid  md:grid-cols-2 h-full w-full py-3 px-4 max-w-6xl mx-auto">
        {/* Login image */}
        <img src={LogInImage} alt="" className="mb-10 cursor-pointer" />
        <div className=" md:ml-10 py-8 px-6 bg-blue-100 h-fit md:mt-16">
          {/* This is the beggining of the form */}
          <form onSubmit={formSubmit}>
            <input
              className=" w-full px-4 mb-3 rounded-md shadow-sm border-gray-500  "
              type="email"
              id="email"
              value={email}
              placeholder="enter your Email"
              onChange={onChange}
            />
            <div className="relative">
              <input
                className=" w-full px-4 mb-3 rounded-md shadow-sm border-gray-500  "
                id="password"
                placeholder="enter your passowrd"
                type={showpassword ? "text" : "password"}
                value={password}
                onChange={onChange}
              />
              {showpassword ? (
                <AiFillEye
                  className="absolute right-1 top-3 mr-1  cursor-pointer"
                  onClick={() => setPassword(!showpassword)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute right-1 top-3 mr-1  cursor-pointer"
                  onClick={() => setPassword(!showpassword)}
                />
              )}
            </div>
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
                <Link to="/Forget-password">Forget Password</Link>
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
