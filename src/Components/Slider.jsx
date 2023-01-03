import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  //varibles
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Pagination, Navigation, Autoplay]);

  useEffect(() => {
    async function fectchListings() {
      const docRef = collection(db, "listings");
      const q = query(docRef, orderBy("timestamp", "desc"), limit(5));
      const docSnap = await getDocs(q);
      let listing = [];
      docSnap.forEach((doc) => {
        listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listing);
      setLoading(false);
    }

    fectchListings();
  }, []);
  if (loading) return <Spinner />;
  if (listings.length === 0) return <></>;

  return (
    <Swiper
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000 }}
      pagination={{ type: "progressbar" }}
      effect="fade"
      modules={[EffectFade]}
    >
      {listings.map(({ id, data }) => (
        <SwiperSlide key={id}>
          {" "}
          <div
            style={{
              background: `url(${data.imgUrls[0]}) center, no-repeat`,
              backgroundSize: "cover",
            }}
            className="w-full h-[60vh] relative"
            onClick={() => navigate(`category/${data.type}/${id}`)}
          >
            <p className=" rounded-full my-4 cursor-pointer transition duration-200 ease-in-out bg-gray-600 bg-opacity-50 px-3 py-1 hover:scale-105 hover:bg-blue-700 w-fit min-w-[100px] text-center left-2 text-white relative top-[4%] capitalize">
              {" "}
              {data.name}
            </p>
            <p className=" rounded-full my-4 cursor-pointer transition duration-200 ease-in-out bg-gray-600 bg-opacity-50 px-3 py-1 hover:scale-105 hover:bg-blue-700 w-fit min-w-[100px] text-center left-2 text-white absolute bottom-[6%]">
              {" "}
              ¢{data.price}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
