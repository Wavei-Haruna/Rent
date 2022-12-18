import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  // hooks
  const [editUser, setEditUser] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  //  event handlers
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  function formSubmit(e) {
    e.preventDefault();
  }
  async function applyChanges(e) {
    e.preventDefault();
    setEditUser(!editUser);
    try {
      // udating the user name in the datbase
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      //updating the profile in storage
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        name,
      });
      toast.success("name updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  }
  //
  function signOut() {
    auth.signOut();
    navigate("/");
  }

  return (
    <section className="py-3 px-4   ">
      <h1 className="text-center md:text-4xl text-2xl font-semibold ">
        Profile
      </h1>
      {!editUser ? (
        <>
          <div className=" max-w-6xl flex flex-col items-center text-left my-4 py-4">
            <h3 className=" text-left text-primary font-semibold mb-3">
              {name}
            </h3>
            <h3 className=" text-left text-primary font-semibold ">{email}</h3>
          </div>
          <div className=" flex justify-between items-center whitespace-nowrap  mb-3 max-w-6xl mx-auto ">
            <button
              className="bg-primary text-white font-semibold px-3 py-2 rounded ease-in-out duration-800"
              onClick={() => setEditUser(!editUser)}
            >
              change details
            </button>
            <button
              className="bg-blue-800
          text-white font-semibold px-3 py-2 rounded"
              onClick={signOut}
            >
              sign out
            </button>
          </div>
        </>
      ) : (
        //

        <form
          className=" flex justify-center items-center flex-col bg-blue-200  py-10 m-auto"
          onSubmit={formSubmit}
        >
          <input
            className="w-[40%] px-4 mb-3 rounded-md shadow-sm border-gray-500  m-auto"
            type="text"
            id="name"
            placeholder={name}
            value={name}
            onChange={onChange}
          />

          <input
            className="w-[40%] px-4 mb-3 rounded-md shadow-sm border-gray-500 "
            type="email"
            id="email"
            value={email}
            placeholder={email}
            onChange={onChange}
          />
          <div className=" flex justify-between items-center whitespace-nowrap w-[40%] mb-3 ">
            <button
              type="text"
              className="bg-primary text-white font-semibold px-3 py-2 rounded ease-in-out duration-800"
              onClick={applyChanges}
            >
              Apply Changes
            </button>
            <button
              type="text"
              className="bg-blue-800
          text-white font-semibold px-3 py-2 rounded"
              onClick={signOut}
            >
              sign out
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
