import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function Header() {
  return (
    <header
      className="relative mt-7 flex flex-col-reverse md:flex-row justify-between items-center px-6 sm:px-12 md:px-16 lg:px-20 pt-16 pb-0 lg:pt-20 bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden"
      role="banner"
    >
      <div className="flex-1 space-y-5 text-center md:text-left pb-12 z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug md:leading-tight tracking-tight relative pb-3">
          Book Appointments <br /> With Trusted Doctors
          <span className="absolute bottom-0 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-1 bg-white rounded" />
        </h1>

        <div className="space-y-4">
          <img
            src={assets.group_profiles}
            alt="Icons of trusted doctors"
            className="w-24 sm:w-32 md:w-40 mx-auto md:mx-0"
            loading="lazy"
          />
          <p className="text-gray-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
            Simply browse our doctors and book an appointment with them,
            scheduled online in your comfort zone, free of cost and with full
            convenience.
          </p>
        </div>

        <a
          href="#specialities"
          className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full text-sm md:text-base font-medium shadow-md hover:bg-blue-400 hover:text-black hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Book an appointment with a trusted doctor"
        >
          Book an Appointment
          <img
            src={assets.arrow_icon}
            alt="Arrow icon"
            className="w-5"
            loading="lazy"
          />
        </a>
      </div>

      <div className="flex-1 flex justify-center  md:justify-end items-end mt-10 md:mt-0">
        <img
          src={assets.header_img}
          alt="Healthcare professional illustration"
          className="w-[90%] max-w-[480px] md:max-w-[550px] lg:max-w-[600px] object-contain -mb-8 md:-mb-10 lg:-mb-14 drop-shadow-2xl mt-1.5"
          loading="lazy"
        />
      </div>
    </header>
  );
}

export default Header;
