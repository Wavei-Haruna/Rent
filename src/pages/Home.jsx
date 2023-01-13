import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import ListingItem from "../Components/ListingItem";

export default function Home() {
  // useSatehooks
  const [offersListings, setOffersListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchOffersListings() {
      try {
        const docRef = collection(db, "listings");
        const q = query(
          docRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit("6")
        );
        const docSnap = await getDocs(q);
        let listing = [];
        docSnap.forEach((doc) => {
          listing.push({
            id: doc.id,
            data: doc.data(),
          });
          setOffersListings(listing);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchOffersListings();
  }, []);
  // for the Sale
  useEffect(() => {
    async function fetchSaleListings() {
      try {
        const docRef = collection(db, "listings");
        const q = query(
          docRef,
          where("type", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit("6")
        );
        const docSnap = await getDocs(q);
        let listing = [];
        docSnap.forEach((doc) => {
          listing.push({
            id: doc.id,
            data: doc.data(),
          });
          setSaleListings(listing);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchSaleListings();
  }, []);
  useEffect(() => {
    async function fetchRentListings() {
      try {
        const docRef = collection(db, "listings");
        const q = query(
          docRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit("6")
        );
        const docSnap = await getDocs(q);
        let listing = [];
        docSnap.forEach((doc) => {
          listing.push({
            id: doc.id,
            data: doc.data(),
          });
          setRentListings(listing);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchRentListings();
  }, []);
  return (
    <main>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-4">
        {offersListings && offersListings.length > 0 && (
          <div className="m-2 mb-6">
            <p className="px-4 text-2xl mt-3 font-semibold">Recent offers</p>
            <Link to="/offers">
              <p className="text-sm text-blue-500  px-4 py-1 transition duration-200 ease-in-out hover:text-blue-700  cursor-pointer ">
                show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offersListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
        {/* place for rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <p className="px-4 text-2xl mt-3 font-semibold">Places for Rent</p>
            <Link to="/category/rent">
              <p className="text-sm text-blue-500  px-4 py-1 transition duration-200 ease-in-out hover:text-blue-700  cursor-pointer ">
                show more Rents
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rentListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
        {/* place for sale */}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <p className="px-4 text-2xl mt-3 font-semibold">Places for Sale</p>
            <Link to="/category/sell">
              <p className="text-sm text-blue-500  px-4 py-1 transition duration-200 ease-in-out hover:text-blue-700  cursor-pointer ">
                show more Sales
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {saleListings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
