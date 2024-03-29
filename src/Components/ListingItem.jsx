import React from "react";
import Moment from "react-moment";
import { GoLocation } from "react-icons/go";
import { BiBath, BiBed, BiEdit, BiTrash } from "react-icons/bi";
import { TbToolsKitchen2 } from "react-icons/tb";

import { Link } from "react-router-dom";

export default function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    // we are putting the listing item into a lsit
    <li className=" relative flex flex-col justify-between  bg-gray-700 bg-opacity-50 transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:shadow-lg  rounded overflow-hidden mb-4 text-primary">
      <Link to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[200px] object-cover rounded transition duration-200 hover:scale-105 ease-in-out
          w-full 
          "
          loading="lazy"
          src={listing.imgUrls[0]}
          alt=""
        />
        <Moment
          className="absolute rounded-md top-2 left-2 bg-primary bg-opacity-50 px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>

        <div className="w-full p-[10px]">
          <p className=" text-blue-700   capitalize truncate">{listing.name}</p>
          <p className=" flex items-center   Capitalize">
            <GoLocation className="text-green-700 h-12 mr-3 truncate " />
            {listing.location}
          </p>
          <div className=" flex items-center justify-between space-x-5">
            <p className="text-xl max-w-[200px] px-3 py-1 rounded-md bg-blue-700  text-white ">
              ¢{listing.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            {listing.offer && (
              <p className="text-xl max-w-[200px] px-3 py-1 rounded-md bg-pink-700  text-white ">
                {" "}
                ¢{listing.discount} discount
              </p>
            )}
          </div>
          <div className=" flex space-x-3 w-full py-2">
            <p className="flex justify-center items-center space-x-2">
              <BiBed className="mr-2 text-blue-900 text-xl" />
              {listing.bedRooms > 1
                ? `${listing.bedRooms} Beds`
                : `${listing.bedRooms} Bed`}
            </p>
            <p className="flex  items-center space-x-2">
              <BiBath className="mr-2 text-blue-900 text-xl" />
              {listing.bathRooms > 1
                ? `${listing.bathRooms} Baths`
                : `${listing.bathRooms} Bath`}
            </p>
            <p className="flex justify-center items-center space-x-2">
              <TbToolsKitchen2 className="mr-2 text-blue-900 text-xl" />
              {listing.kitchen ? "Kitchen" : "No Kitchen"}
            </p>
          </div>
        </div>
      </Link>

      {onEdit && (
        <BiEdit
          className=" absolute bottom-6  right-16 md:textlg cursor-pointer "
          //we want to pass the id of the current item as a parameter to the function
          onClick={() => onEdit(listing.id)}
        />
      )}
      {onDelete && (
        <BiTrash
          className=" absolute bottom-6 right-8  text-red-700  md:textlg cursor-pointer"
          onClick={() => onDelete(listing.id)}
        />
      )}
    </li>
  );
}
