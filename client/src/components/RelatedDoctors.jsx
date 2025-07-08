import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function RelatedDoctors({ docId, speciality }) {
  const { doctors, navigate } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const docData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(docData);
    }
  }, [doctors, docId, speciality]);

  return (
    <section className="px-6 sm:px-12 md:px-16 lg:px-20 py-20 lg:py-24 bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 relative pb-3">
          Related Doctors
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-blue-500 rounded" />
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointments/${item._id}`);
              scrollTo(0, 0);
            }}
            className="group bg-blue-50 shadow-sm rounded-xl p-5 flex flex-col items-center text-center hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
            role="button"
            aria-label={`View profile of Dr. ${item.name}`}
          >
            <img
              src={item.image}
              alt={`Dr. ${item.name}`}
              loading="lazy"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mb-4 object-cover shadow-md group-hover:shadow-lg transition"
            />
            <div className="space-y-2">
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

      <div className="flex justify-center mt-10">
        <button
          type="button"
          onClick={() => {
            scrollTo(0, 0);
            navigate("/doctors");
          }}
          aria-label="View more doctors"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          View All Doctors
        </button>
      </div>
    </section>
  );
}

export default RelatedDoctors;
