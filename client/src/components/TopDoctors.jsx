import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function TopDoctors() {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="px-4 sm:px-8 md:px-14 lg:px-20 py-16 sm:py-20 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl  text-gray-900 relative inline-block">
          Top Doctors to Book
          <span className="block h-1 w-16 bg-blue-500 mt-2 mx-auto rounded-full" />
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
          Simply browse our platform to explore a trusted list of doctors and
          book with ease.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointments/${item._id}`), scrollTo(0, 0);
            }}
            className="group bg-blue-50 shadow-sm rounded-xl p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 ease-in-out"
            role="button"
            aria-label={`View profile of Dr. ${item.name}`}
          >
            <img
              src={item.image}
              alt={`Dr. ${item.name}`}
              loading="lazy"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-4 shadow-md group-hover:shadow-lg transition"
            />
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                {item.available ? (
                  <p className="text-green-600 text-xs font-semibold">
                    Available
                  </p>
                ) : (
                  <p className="text-red-600 text-xs font-semibold">
                    Not Available
                  </p>
                )}
                <span
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }  rounded-full`}
                />
              </div>
              <p className="text-gray-900 font-semibold text-sm sm:text-base">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          type="button"
          onClick={() => {
            scrollTo(0, 0);
            navigate("/doctors");
          }}
          aria-label="View more doctors"
          className="bg-blue-500 cursor-pointer text-white px-8 py-3 rounded-full text-base font-medium shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          More Doctors
        </button>
      </div>
    </section>
  );
}

export default TopDoctors;
