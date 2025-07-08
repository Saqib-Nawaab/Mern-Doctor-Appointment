import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

function SpecialityMenu() {
  return (
    <section id="specialities" className="px-6 md:px-16 py-16 ">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-medium text-gray-800">
          Find By Speciality
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Simply browse our website through our extensive list of trusted
          doctors. Schedule your appointment hassle-free and with full
          convenience.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            key={index}
            onClick={() => scrollTo(0, 0)}
            className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-all duration-400 hover:scale-105 flex-shrink-0 hover:translate-y-[-10px]  "
          >
            <img
              src={item.image}
              alt={item.speciality}
              loading="lazy"
              className="w-16 h-16 mx-auto mb-3 "
            />
            <p className="text-gray-800 font-medium text-sm md:text-base hover:text-blue-500 ">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default SpecialityMenu;
