import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListingItem from "../Components/ListingItem";
import Spinner from "../Components/Spinner";
import { db } from "../firebase";

export default function Offers() {
  //hooks
  const [listing, setListing] = useState(null);
  const [lastlisting, setLastListing] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchListing() {
      try {
        const docRef = collection(db, "listings");
        const q = query(
          docRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const docSnap = await getDocs(q);
        // lets get the last visible
        const lastVisible = docSnap.docs[docSnap.docs.length - 1];
        setLastListing(lastVisible);
        if (docSnap) {
          let listing = [];
          docSnap.forEach((doc) => {
            console.log(doc.data());
            listing.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setLoading(false);
          setListing(listing);
        }
      } catch (error) {
        toast.error("oops there is an error");
        console.log(error);
      }
    }
    // fetch more listings

    fetchListing();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      {listing !== null && listing.length > 0 && (
        <div>
          <ul className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listing.map((listing) => (
              <ListingItem
                id={listing.id}
                listing={listing.data}
                key={listing.id}
              />
            ))}
          </ul>{" "}
          {lastlisting && (
            <div className=" px-4 w-full my-4 ">
              <button className=" rounded-md bg-primary px-4 p-2 text-white font-semibold hover:bg-blue-700 duration-200 transition ease-in-out shadow-md cursor-pointer">
                More Offers
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
