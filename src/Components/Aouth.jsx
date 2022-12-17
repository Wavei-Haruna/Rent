import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function Aouth() {
  // google click handler
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // checking if the user already exist in the database before adding it to the database
      // create a ref
      const docRef = doc(db, "users", user.uid);
      // if this exist we will put it into the docSnap
      const docSnap = await getDoc(docRef);
      //if statement
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
      toast.success("succesfull");
    } catch (error) {
      toast.error("oops something went wrong try again");
    }
  }
  return (
    <div>
      <button
        type="button"
        className="w-full rounded-md py-3 bg-primary text-white flex items-center  justify-center"
        onClick={onGoogleClick}
      >
        <FcGoogle className="mr-2 text-2xl" /> Google
      </button>
    </div>
  );
}
