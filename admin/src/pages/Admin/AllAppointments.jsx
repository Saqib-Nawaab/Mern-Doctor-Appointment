import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function AllAppointments() {
  const { getAllAppointments, aToken, appointments, cancelAppointmentByAdmin } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  const currency = "$";

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
      console.log(appointments);
    }
  }, [aToken]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        All Appointments
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <div className="grid grid-cols-7 bg-indigo-600 text-white text-sm font-medium py-3 px-4 rounded-t-xl">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-7 items-center gap-2 px-4 py-3 border-b hover:bg-blue-100 text-sm"
          >
            <p>{index + 1}</p>

            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="Patient"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item.userData.name}</p>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>

            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className="flex items-center gap-2">
              <img
                src={item.docData.image}
                alt="Doctor"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item.docData.name}</p>
            </div>

            <p>
              {currency}
              {item.docData.fees}
            </p>

            {item.cancelled ? (
              <p className=" text-red-500 font-medium w-10">Cancelled</p>
            ) : item.isCompleted ? (
              <p className=" text-green-500 font-medium w-10">Completed</p>
            ) : (
              <img
                src={assets.cancel_icon}
                onClick={() => cancelAppointmentByAdmin(item._id)}
                alt="Cancel"
                className="w-10  cursor-pointer hover:scale-110 transition-transform duration-200"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointments;
