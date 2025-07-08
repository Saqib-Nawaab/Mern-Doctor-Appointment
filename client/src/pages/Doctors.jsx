import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useState } from "react";

function Doctors() {

  
  const { speciality } = useParams();
  const { doctors, navigate } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyfilter = () => {
    if (speciality) {
      const filtered = doctors.filter((item) => item.speciality === speciality);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  };

  useEffect(() => {
    applyfilter();
  }, [speciality, doctors]);

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-10">
      <p className="text-gray-700 text-base sm:text-lg font-medium mb-4">
        Browse through the doctor specialties
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`text-sm sm:hidden px-4 py-2 border border-gray-400 rounded-full transition-all duration-200 ${
            showFilter
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 text-gray-700"
          }`}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <div
          className={`flex flex-col gap-3 text-sm ${
            showFilter ? "flex" : "hidden sm:flex"
          } text-gray-600 sm:min-w-[220px]`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((item, idx) => (
            <p
              key={idx}
              onClick={() =>
                speciality === item
                  ? navigate("/doctors")
                  : navigate(`/doctors/${item}`)
              }
              className={`px-4 py-2 rounded-full border border-gray-300 cursor-pointer transition-all duration-150 ${
                speciality === item
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 flex-1">
          {filteredDoctors.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointments/${item._id}`), scrollTo(0, 0);
              }}
              className="group bg-blue-50 rounded-xl p-5 flex flex-col items-center text-center shadow hover:shadow-lg hover:scale-[1.04] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              role="button"
              aria-label={`View profile of Dr. ${item.name}`}
            >
              <img
                src={item.image}
                alt={`Dr. ${item.name}`}
                loading="lazy"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md mb-4 group-hover:shadow-xl transition"
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
                <p className="text-gray-800 font-semibold text-sm sm:text-base">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
