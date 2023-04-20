import React from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import SimplirentLogo from "../assets/Images/simplirent.png";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <img
        src={SimplirentLogo}
        alt="Simplirent Logo"
        className="w-24 h-24 mb-4"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Simplify your rental process with Simplirent
      </h1>

      <p className="text-lg text-gray-600 text-center mb-8">
        We offer an easy and efficient way to manage your properties and find
        new tenants
      </p>

      <div className="flex items-center justify-center bg-gray-200 rounded-lg p-4">
        <FaHome className="w-8 h-8 text-gray-600 mr-2" />
        <p className="text-lg text-gray-800">
          Find your perfect home or apartment
        </p>
      </div>

      <div className="flex items-center justify-center bg-gray-200 rounded-lg p-4 mt-4">
        <FaHome className="w-8 h-8 text-gray-600 mr-2" />
        <p className="text-lg text-gray-800">
          List your properties and manage your bookings
        </p>
      </div>
    </motion.div>
  );
};

export default About;
