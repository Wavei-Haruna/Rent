import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../Components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCrore, {
  EffectFade,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper";
import "swiper/css/bundle";
import {
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { TbToolsKitchen } from "react-icons/tb";
import { getAuth } from "firebase/auth";
import LandlordContact from "../Components/ContactLandlord";

export default function Listing() {
  //variables
  const auth = getAuth();
  const params = useParams();
  // hooks
  const [loading, setLoading] = useState(true);
  const [contactLandloard, setContactLandloard] = useState(false);
  const [share, setShare] = useState(false);
  const [listing, setListing] = useState(null);

  // we will want to use pagination, navigation and pagination
  SwiperCrore.use([Pagination, Navigation, Autoplay]);
  useEffect(() => {
    async function fetchListing() {
      setLoading(true);
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      //  check if the data exit we will now setLoading to false
      if (docSnap) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  } else
    return (
      <main>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 5000 }}
        >
          {listing.imgUrls.map((url, index) => (
            <SwiperSlide>
              <div
                className=" relative w-full overflow-hidden h-[400px] object-cover"
                key={index}
                style={{
                  background: `url(${listing.imgUrls[index]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className=" fixed top-[24%] right-[3%] bg-white rounded-full border-[2px] border-gray-500 p-2 z-50 text-xl text-blue-500 cursor-pointer"
          onClick={() => {
            // adding the copy to clipboard functionality
            navigator.clipboard.writeText(window.location.href);
            setShare(true);
            setTimeout(() => {
              setShare(false);
            }, 2000);
          }}
        >
          {" "}
          <FaShare />{" "}
        </div>
        {share && (
          <p className=" z-50 absolute top-[35%] right-[7%] bg-white  text-center rounded-lg ease-in-out transition duration-100 px-2 py-1 ">
            link copied
          </p>
        )}
        {/* adding the listing description */}
        <div className="flex flex-col md:flex-row max-w-6xl lg:mx-auto bg-white px-3 py-2 rounded lg:space-x-10 space-y-10 md:space-y-0">
          <div className="bg-pink-300 w-full h-[400px] md:h- px-3 py-2">
            <p className="mt-3 font-semibold text-xl text-gray-700 capitalize">
              {listing.name} -
              <span className="text-blue-900 ml-3">
                ¢
                {listing.price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                .00 {listing.type === "rent" ? "/year" : ""}
              </span>
            </p>
            <p className="flex items-center mt-4  capitalize ">
              <FaMapMarkedAlt className="text-xl mr-2 text-blue-700 " />
              {listing.location}
            </p>
            <div className="flex items-center space-x-2 md:space-x-10">
              <p className=" mt-3 w-full max-w-[200px] bg-blue-800 text-center capitalize rounded-md py-2 text-white">
                {listing.type === "rent" ? "For Rent" : " for Sale"}
              </p>
              <p className=" mt-3 w-full max-w-[200px] bg-green-800 text-center  rounded-md py-2 text-white">
                {" "}
                {listing.offer
                  ? `¢ ${listing.discount} Discount`
                  : "No discount"}
              </p>
            </div>
            <p className=" mt-3">
              <span className="font-bold">Description-</span>
              {listing.description}
            </p>
            <div className="flex space-x-3 md:space-x-10 mt-3 flex-wrap">
              <p className="flex items-center ">
                <FaBed className="text-xl mr-2 text-blue-500" />
                {listing.bedRooms}
                {+listing.bedRooms > 1 ? "Beds" : "Bed"}
              </p>
              <p className="flex items-center ">
                <TbToolsKitchen className="text-xl mr-2 text-blue-500" />

                {listing.kitchen ? "Kitchen" : "No Kitchen"}
              </p>
              <p className="flex items-center ">
                <FaChair className="text-xl mr-2 text-blue-500" />

                {listing.furnished ? "Furnished" : "Not furnished"}
              </p>
              <p className="flex items-center ">
                <FaParking className="text-xl mr-2 text-blue-500" />

                {listing.parking ? "car parking" : "no parking"}
              </p>
            </div>
            {/* Contact Landlord section */}
            {listing.userRef !== auth.currentUser?.uid && (
              <div className="mt-4">
                {!contactLandloard && (
                  <button
                    className=" bg-primary px-5 font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-md py-3 text-white text-center transition duration-200 ease-in-out w-full "
                    onClick={() => setContactLandloard(true)}
                  >
                    Contact Landloard
                  </button>
                )}
              </div>
            )}
            {contactLandloard && (
              <LandlordContact userRef={listing.userRef} listing={listing} />
            )}
          </div>
          <div className="bg-gray-300 w-full h-[400px]  rounded-md">
            <img
              src={listing.imgUrls[0]}
              alt=""
              className=" h-full w-full object-cover rounded-xl hover:scale-105 cursor-pointer"
            />
          </div>
        </div>
      </main>
    );
}
