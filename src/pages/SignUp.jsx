import React, { useState } from "react";
import { Link } from "react-router-dom";
import Aouth from "../Components/Aouth";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
// Firbase libraries
import { db } from "../firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import LogInImage from "../assets/Images/login.png";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function SignUp() {
  const [showpassword, setPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  // end of state variables
  const Navigate = useNavigate();
  const onChange = (e) => {
    // the setFormData function below is taking each record and adding it to the target value
    //
    setFormData((preState) => ({
      ...preState,
      [e.target.id]: e.target.value,
    }));
  };
  // submit event
  async function formSubmit(e) {
    e.preventDefault();

    try {
      // assign the getAuth method to an initial variable
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // updating the user profile
      // this takes the current user and the update u will want to make
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      // making a copy of the form data
      const formDataCopy = { ...formData };
      //  we do not want to add the password to to the database for security resons
      // also it has been hashed into the authentication, that is the password has already been saved
      delete formDataCopy.password;
      // also we need to add the timestamp the formdata has been copied into the database
      // we need to use a method call server timestamp
      formDataCopy.timestamp = serverTimestamp();
      // creating a document to put the user data into it
      // you need to know that this is also a promise
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // navigating to the home page after sign in
      Navigate("/");
      toast.success("succefull");
    } catch (error) {
      const errorCode = error.code;

      const errorMessage = error.message;
      toast.error(`oops something went wrong check and try again`);
    }
  }
  return (
    <section className="h-full">
      <h1 className="text-center text-primary font-semibold md:text-4xl text-2xl pt-8">
        Sign Up
      </h1>
      <div className="grid  md:grid-cols-2 h-full w-full py-3 px-4 max-w-6xl mx-auto">
        {/* Login image */}
        <img src={LogInImage} alt="" className="mb-10 cursor-pointer" />
        <div className=" md:ml-10 py-8 px-6 bg-blue-100 h-fit md:mt-16">
          <form onSubmit={formSubmit}>
            <input
              className=" w-full px-4 mb-3 rounded-md shadow-sm border-gray-500  "
              type="text"
              id="name"
              value={name}
              placeholder="enter fullname"
              onChange={onChange}
            />
            <input
              className=" w-full px-4 mb-3 rounded-md shadow-sm border-gray-500  "
              type="email"
              id="email"
              value={email}
              placeholder="enter email"
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
                Already a user?
                <Link
                  to="/sign-in"
                  className="text-primary ml-1 font-semibold  cursor-pointer"
                >
                  Sign in
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
