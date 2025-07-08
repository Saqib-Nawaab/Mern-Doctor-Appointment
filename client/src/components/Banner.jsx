import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Banner() {
  const { navigate } = useContext(AppContext);

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-blue-500 rounded-2xl px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-14 md:py-20 my-10 mx-4 sm:mx-6 md:mx-10 overflow-hidden">
      <div className="flex-1 text-center md:text-left space-y-5">
        <h1 className="text-2xl  sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug tracking-tight">
          Book Appointments <br className="hidden sm:block" /> With 100+ Trusted Doctors
        </h1>

        <p className="text-gray-100 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
          Browse our extensive list of trusted doctors and schedule your
          appointment hassle-free from the comfort of your home.
        </p>

        <div
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          <button
            type="button"
            aria-label="Create a new account to book appointments"
            className="bg-white text-blue-600 px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-medium shadow-md hover:bg-blue-400 hover:text-black cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="w-full mb-10 md:mb-0 md:w-1/2 flex justify-center">
        <img
          src={assets.appointment_img}
          alt="Appointment Illustration"
          className="w-40 sm:w-60 md:w-72 lg:w-[370px] object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Banner;
