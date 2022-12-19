import React, { useState } from "react";

export default function CreateListing() {
  //hooks
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedRooms: 1,
    bathRooms: 1,
    kitchen: false,
    furnished: false,
    parking: false,
    location: "",
    description: "",
    offer: false,
    price: 1500,
    discount: 100,
    images: null,
  });
  // deconstract form data
  const {
    type,
    name,
    bedRooms,
    bathRooms,
    kitchen,
    furnished,
    parking,
    location,
    description,
    offer,
    price,
    discount,
    images,
  } = formData;
  //functions
  function onChange() {}
  return (
    <main className="max-w-md px-10 bg-blue-200 mx-auto text-primary">
      <h1 className="text-priamry text-center text-2xl md:text-4xl font-semibold py-3 uppercase">
        Create Listing
      </h1>
      <form>
        <p className="font-semibold mt-6 text-center ">Sell or Rent</p>
        {/* sell or rent buttons */}
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              type === "rent" ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
          >
            Rent
          </button>
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              type === "sell" ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
          >
            Sell
          </button>
          {/* end of sell or rent */}
        </div>
        {/* property Name */}
        <label className="font-semibold text-lg mt-4 p-2" htmlFor="name">
          Name
        </label>
        <br />
        <input
          className="rounded my-3 text-xl w-full bg-white transition duration-150 ease-in-out
          "
          maxLength="54"
          required
          placeholder="name of property"
          type="text"
          id="name"
          value={name}
          onChange={onchange}
        />

        <div className="flex space-x-10">
          {/* Bedrooms  */}
          <div>
            <label
              className="font-semibold text-lg mt-4 p-2"
              htmlFor="bedRooms"
            >
              Bed rooms
            </label>
            <br />
            <input
              className="rounded my-3 text-xl w-full bg-white transition duration-150 ease-in-out  text-center
          "
              max="100"
              min="1"
              required
              type="number"
              id="bedRooms"
              value={bedRooms}
              onChange={onchange}
            />
          </div>
          {/* Bathrooms */}
          <div className="flex">
            <div>
              <label
                className="font-semibold text-lg mt-4 p-2"
                htmlFor="bathRooms"
              >
                Bath rooms
              </label>
              <br />
              <input
                className="rounded my-3 text-xl w-full bg-white transition duration-150 ease-in-out text-center
          "
                max="100"
                min="1"
                required
                type="number"
                id="bathRooms"
                value={bathRooms}
                onChange={onchange}
              />
            </div>
          </div>
        </div>
        {/* Kitchen or not */}
        <h1 className="text-center font-semibold">Have a Kitchen?</h1>
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              kitchen ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="kitchen"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              !kitchen ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="kitchen"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        {/* end of kitchen */}
        {/* car park */}
        <h1 className="text-center font-semibold">Furnished?</h1>
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              furnished ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="furnished"
            id="type"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              !furnished ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        {/* end of sell or rent */}
        {/* car park */}
        <h1 className="text-center font-semibold">Have a car park?</h1>
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              parking ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              !parking ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        {/* end of car park */}
        {/* Property Location */}
        <label className="font-semibold text-lg mt-4 p-2" htmlFor="location">
          Location
        </label>
        <br />
        <input
          className="rounded my-3 text-xl w-full bg-white transition duration-150 ease-in-out
          "
          maxLength="54"
          required
          placeholder="location of property"
          type="text"
          id="location"
          value={location}
          onChange={onchange}
        />
        <label className="font-semibold text-lg mt-4 p-2" htmlFor="location">
          Description
        </label>
        <br />
        <textarea
          className="rounded my-3 text-xl w-full bg-white transition duration-150 ease-in-out
          "
          maxLength="54"
          required
          placeholder="description"
          type="text"
          id="description"
          value={description}
          onChange={onchange}
        />
        {/* car park */}
        <h1 className="text-center font-semibold">Offers</h1>
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              offer ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              !offer ? "bg-blue-500 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
          >
            No
          </button>
        </div>
        {/* end of car park */}
        {/* end of offers */}

        <h1 className="text-center font-semibold text-primary">Price</h1>
        <div className="flex space-x-10 items-center mb-4 py-3">
          <div>
            <input
              className="rounded w-full px-3 text-center font-medium text-lg transition duration-200 ease-linear shadow-lg focus:shadow-lg hover:shadow-lg"
              type="number"
              id="price"
              max="1000000"
              value={price}
              onChange={onchange}
            ></input>
          </div>
          {type === "rent" ? (
            <p className="text-primary font-semibold">¢/Year</p>
          ) : (
            <p className="text-primary font-semibold">¢</p>
          )}
        </div>
        {/* end of price */}
        {offer && (
          <>
            {" "}
            <h1 className="text-center font-semibold text-primary">Discount</h1>
            <div className="flex space-x-10 items-center mb-4">
              <div>
                <input
                  className="rounded w-full px-3 text-center font-medium text-lg transition duration-200 ease-linear shadow-lg focus:shadow-lg hover:shadow-lg"
                  type="number"
                  id="discount"
                  max="1000000"
                  value={discount}
                  onChange={onchange}
                ></input>
              </div>
              {type === "rent" ? (
                <p className="text-primary font-semibold">¢/Year</p>
              ) : (
                <p className="text-primary font-semibold">¢</p>
              )}
            </div>
          </>
        )}

        {/* end of discount */}
        <h1 className="text-center text-primary font-semibold">
          {" "}
          Upload Images
        </h1>
        <p className="text-slate-400 text-sm "> max images 6</p>
        <input
          className="w-full rounded transition duration-200 ease-in-out shadow-lg mb-4 py-3 font-semibold"
          type="file"
          id="images"
          value={images}
          accept=".jpg,.jpeg,.png"
          required
          multiple
        />
        <div></div>
        {/* creating listing */}
        <button
          className="w-full  my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition  duration-200 ease-in-out uppercase rounded bg-blue-300 active:bg-blue-500 hover:bg-blue-500"
          type="submit"
        >
          Create Listing{" "}
        </button>
      </form>
    </main>
  );
}
