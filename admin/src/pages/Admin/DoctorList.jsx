import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

function DoctorList() {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        All Doctors
      </h1>

      <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md group hover:shadow-xl transition duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className=" w-full h-full  object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0  " />
              </div>

              <div className="p-4">
                <p className="text-xl font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    onChange={() => changeAvailability(item._id)}
                    checked={item.available}
                    readOnly
                    className="w-4 h-4  accent-green-500 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm font-medium ${
                      item.available ? "text-green-600" : "text-red-500"
                    }`}
                    
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
