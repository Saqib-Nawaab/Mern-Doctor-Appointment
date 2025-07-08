import React from "react";
import { assets } from "../assets/assets.js";

function About() {
  return (
    <div className="px-6 sm:px-12 md:px-20 lg:px-32 py-16">
      <div className="text-center text-3xl font-semibold text-gray-700 mb-12">
        <p>
          ABOUT <span className="text-blue-600">Us</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={assets.about_image}
          alt="About us"
          className="w-full md:w-1/2 rounded-lg "
        />

        <div className="text-gray-700 text-lg space-y-6">
          <p>
            Welcome to our platform — a space where innovation meets care. We
            are committed to providing exceptional service, grounded in trust
            and dedication. Our mission is to simplify access, enhance
            well-being, and create lasting value for every individual we serve.
          </p>

          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-2">Our Vision</h3>
            <p>
              To lead with integrity, inspire with purpose, and transform lives
              through meaningful connections, advanced solutions, and unwavering
              compassion.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-3xl mt-20 font-semibold text-gray-700 mb-12">
        <p className="text-blue-500">
          Why <span className="text-gray-700">Choose Us</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-20 px-6 sm:px-12 md:px-20">
        <div className="flex-1 border border-gray-300 rounded-lg p-6 sm:p-8 hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer ">
          <b className="text-lg block mb-2">Efficiency</b>
          <p className="text-sm">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>

        <div className="flex-1 border border-gray-300 rounded-lg p-6 sm:p-8 hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer ">
          <b className="text-lg block mb-2">Convenience</b>
          <p className="text-sm">
            Access our platform from anywhere, at any time.
          </p>
        </div>

        <div className="flex-1 border border-gray-300 rounded-lg p-6 sm:p-8 hover:bg-blue-400 hover:text-white transition-all duration-300 cursor-pointer ">
          <b className="text-lg block mb-2">Personalization</b>
          <p className="text-sm">
            Personalized care tailored specifically to your needs.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
