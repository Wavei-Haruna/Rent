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

export default function Listing() {
  //variables
  const params = useParams();
  // hooks
  const [loading, setLoading] = useState(true);
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
    );
}
