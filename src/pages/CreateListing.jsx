import { db } from "../firebase";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Components/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function CreateListing() {
  const auth = getAuth();
  const navigate = useNavigate();
  //hooks

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedRooms: 1,
    bathRooms: 1,
    kitchen: false,
    furnished: false,
    offer: false,
    parking: false,
    location: "",
    description: "",
    discount: 100,
    images: {},
    latitude: 0,
    longitude: 0,
  });
  // deconstract
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
    latitude,
    longitude,
  } = formData;

  //functions
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "false") {
      boolean = false;
    }
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  // function for form submision
  // creating the geolocation
  const geolocation = {};
  geolocation.lat = latitude;
  geolocation.long = longitude;

  async function onFormSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (discount >= price) {
      toast.error("Discount should not be more than regular price");
      setLoading(false);
      return;
    }
    if (images.length >= 6) {
      setLoading(false);
      toast.error("less than 7 images are allowed");
      return;
    }
    // uploading images
    async function storeImages(image) {
      // we have to return a new peomise
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        // we need to know the user that is uploading the file so we have to use the backtext to make the fike name dynamic
        // we also need to add uuid to get random names for the files we are uploading
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        // after this we need to creaet the storage reference
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    // we getting the image urls and putting in the required function
    const imgUrls = await Promise.all(
      // get the image and pass it as an argument to the image store function which will get a url for it from the store and assign it back to the image url
      [...images].map((image) => storeImages(image))
    ).catch((error) => {
      toast.error("images not uploaded");
      setLoading(false);
    });
    // creating the form datacopy

    const formDataCopy = {
      ...formData,
      geolocation,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discount;
    // adding a new document to the database
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    docRef && setLoading(false);
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    toast.success("Listing created");
  }

  //

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md px-10 bg-blue-200 mx-auto text-primary">
      <h1 className="text-priamry text-center text-2xl md:text-4xl font-semibold py-3 uppercase">
        Create Listing
      </h1>
      <form onSubmit={onFormSubmit}>
        <p className="font-semibold mt-6 text-center ">Sell or Rent</p>
        {/* sell or rent buttons */}
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              type === "rent" ? "bg-blue-600 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
          >
            Rent
          </button>
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              type === "sell" ? "bg-blue-600 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="type"
            value="sell"
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
          onChange={onChange}
          maxLength="54"
          required
          placeholder="name of property"
          type="text"
          id="name"
          value={name}
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
              onChange={onChange}
              max="100"
              min="1"
              required
              type="number"
              id="bedRooms"
              value={bedRooms}
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
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        {/* Kitchen or not */}
        <h1 className="text-center font-semibold">Have a Kitchen?</h1>
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              kitchen ? "bg-blue-600 text-white" : "bg-blue-300"
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
              !kitchen ? "bg-blue-600 text-white" : "bg-blue-300"
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
              furnished ? "bg-blue-600 text-white" : "bg-blue-300"
            }`}
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              !furnished ? "bg-blue-600 text-white" : "bg-blue-300"
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
              parking ? "bg-blue-600 text-white" : "bg-blue-300"
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
              !parking ? "bg-blue-600 text-white" : "bg-blue-300"
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
          onChange={onChange}
        />
        {/* end of location */}
        <div className="flex space-x-10">
          <div>
            <p p className=" text-center font-semibold text-primary">
              Latitude
            </p>
            <input
              className="rounded my-3 text-xl w-full bg-white transition duration-150 ease-in-out
          "
              type="number"
              id="latitude"
              min="-90"
              value={latitude}
              max="90"
              onChange={onChange}
            />
          </div>
          <div>
            <p className=" text-center font-semibold text-primary">Longitude</p>
            <input
              className="rounded my-3 text-xl w-full bg-white transition duration-150 ease-in-out
          "
              type="number"
              id="longitude"
              min="-180"
              value={longitude}
              max="180"
              onChange={onChange}
            />
          </div>
        </div>
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
          onChange={onChange}
        />
        {/* car park */}
        <h1 className="text-center font-semibold">Offers</h1>
        <div className="flex space-x-10">
          <button
            className={`w-full my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition duration-200 ease-in-out uppercase rounded ${
              offer ? "bg-blue-600 text-white" : "bg-blue-300"
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
              !offer ? "bg-blue-600 text-white" : "bg-blue-300"
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
              onChange={onChange}
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
                  onChange={onChange}
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
          accept=".jpg,.jpeg,.png"
          required
          multiple
          onChange={onChange}
        />
        <div></div>
        {/* creating listing */}
        <button
          className="w-full  my-3 px-7 py-3 font-medium text-sm shadow-md hover:shadow-lg active:shadow-lg focus:shadow-lg transition  duration-200 ease-in-out uppercase rounded bg-white active:bg-blue-600 hover:bg-blue-600"
          type="submit"
        >
          Create Listing{" "}
        </button>
      </form>
    </main>
  );
}
