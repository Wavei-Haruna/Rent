import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import ListingItem from "../Components/ListingItem";
import SkeletonGrid from "../Components/SkeletonGrid";
import swal from "sweetalert";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  // hooks
  const [listings, setListings] = useState(null);

  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    userImage: auth.currentUser.photoURL,
  });
  console.log(auth.currentUser);
  const { name, email, userImage } = formData;
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
  // another use effect to fetch the listing based on the user
  useEffect(() => {
    async function fetchUserListing() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      // looping through the query snap to push the various ID's and docs details in the doc

      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setLoading(false);
      setListings(listings);
    }
    fetchUserListing();
  }, [auth.currentUser.uid, listings]);
  //Editing lisiting
  function onEdit(listingdID) {
    navigate(`/edit-listing${listingdID}`);
  }
  // deleting listing
  async function onDelete(listingID) {
    swal({
      title: "comfirm?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const deleteDocFunction = async () => {
          await deleteDoc(doc(db, "listings", listingID));
          // we need to update our lisitng after deleting a lisiting
          const updatedListing = listings.filter((listing) => {
            listing.id !== listingID;
          });
          // update the setlisting hook after filtering the lisiting
          setListings(updatedListing);
        };
        deleteDocFunction();
        swal("Deleted", {
          icon: "success",
        });
      } else {
        swal("cancel delete succesful");
      }
    });
  }
  return (
    <section className="py-3 px-4   ">
      {!editUser ? (
        <>
          <div className=" max-w-6xl flex flex-col items-center text-left my-4 py-4">
            <h3 className=" text-left text-primary font-semibold mb-3">
              {name}
            </h3>
            <h3 className=" text-left text-primary font-semibold ">{email}</h3>
          </div>
          <div className=" flex justify-between items-center whitespace-nowrap  mb-3 max-w-6xl mx-auto w-[60%] space-x-3 md:w-[40%]">
            <button
              className="w-full bg-primary text-white font-semibold px-3 py-2 rounded ease-in-out transition duration-200 hover:bg-blue-600 cursor-pointer"
              onClick={() => setEditUser(!editUser)}
            >
              change details
            </button>
            <button
              className="w-full bg-blue-800 transition duration-200 ease-in-out hover:bg-blue-600 cursor-pointer
          text-white font-semibold px-3 py-2 rounded"
              onClick={signOut}
            >
              sign out
            </button>
            {/* creating the listing butto */}
          </div>
          <div className="flex items-center justify-center py-3">
            <button
              className="w-[60%] md:w-[40%] px-4 mb-3 rounded-md shadow-sm border-gray-500 bg-primary py-2 transition duration-200 ease-in-out hover:bg-blue-600 cursor-pointer"
              type="submit"
              onClick={() => navigate("/create-listing")}
            >
              <Link
                className="flex items-center justify-center  text-white"
                to="/create-listing"
              >
                <FcHome className="mr-3" />
                <p>Rent or Sell your House</p>
              </Link>
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
      <div className="grid ">
        <h1 className="text-center text-primary md:4xl font-semibold">
          My Listing
        </h1>
        {loading && <SkeletonGrid className="w-full" />}
        {!loading && listings.length > 0 && (
          <div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onEdit={() => onEdit(listing.id)}
                  onDelete={() => onDelete(listing.id)}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
