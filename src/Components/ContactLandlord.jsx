import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function ContactLandlord({ userRef, listing }) {
  //hooks
  const [landloard, setLandloard] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandloard(docSnap.data());
      } else {
        toast.error("oops can not see landloard");
      }
    }
    getLandlord();
  }, []);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <div>
      {landloard !== null && (
        <div>
          <p>
            contact {landloard.name} for the {listing.name.toLowerCase()}{" "}
          </p>
          <div>
            <textarea
              className="rounded w-full mt-3"
              id="message"
              value={message}
              rows="2"
              onChange={onChange}
            ></textarea>
          </div>
          <a
            className="w-full mt-3 flex justify-center"
            href={`mailto:${landloard.email}?subject=${listing.name}&body=${message}`}
          >
            <button className="hover:bg-blue-800 w-1/2  py-3 px-4 rounded-md text-white font-semibold text-md bg-primary transition ease-in-out duration-200 flex items-center justify-center">
              <FaPaperPlane className="text-lg mr-2" />
              send message
            </button>
          </a>
        </div>
      )}
    </div>
  );
}
