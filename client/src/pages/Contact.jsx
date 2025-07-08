import React from "react";
import { assets } from "../assets/assets.js";

function Contact() {
  return (
    <div className="px-6 sm:px-12 md:px-20 lg:px-32 py-16">
      <div className="text-center text-3xl font-semibold text-gray-700 mb-12">
        <p>
          Contact <span className="text-blue-600 font-semibold">Us</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={assets.contact_image}
          alt="Contact us"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />

        <div className="w-full md:w-1/2 space-y-4 text-gray-700 text-lg">
          <p className="text-2xl font-semibold text-gray-800">Our Office</p>
          <p>5470 William Station | Suite 101</p>
          <p>San Francisco, CA 94110, Washington, USA</p>
          <p>Tel: +1 (800) 123-4567</p>
          <p className="font-medium text-gray-800 mt-4">
            Careers at Healthcare
          </p>
          <p>Learn more about us and our services.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-5 rounded transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
