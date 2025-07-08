import React, { useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
function DoctorAppointments() {
  const {
    dToken,
    getAppointments,
    setAppointments,
    appointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const currency = "$";

  const { calculateAge, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <p className="text-2xl font-semibold p-4 text-gray-800">
          All Appointments
        </p>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-4 bg-blue-100 p-4 font-medium text-gray-600 text-sm uppercase">
            <p className="text-center">#</p>
            <p className="text-center">Patient</p>
            <p className="text-center">Payment</p>
            <p className="text-center">Age</p>
            <p className="text-center">Date & Time</p>
            <p className="text-center">Fees</p>
            <p className="text-center">Action</p>
          </div>

          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 p-4 border-b hover:bg-blue-50  transition-colors"
            >
              <p className="text-center text-gray-700">{index + 1}</p>
              <div className="flex items-center justify-center space-x-2">
                <img
                  src={item.userData.image}
                  alt="Patient"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-gray-700">{item.userData.name}</p>
              </div>
              <p className="text-center text-gray-700">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    item.payment
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.payment ? "Online" : "Cash"}
                </span>
              </p>
              <p className="text-center text-gray-700">
                {calculateAge(item.userData.dob)}
              </p>
              <p className="text-center text-gray-700">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <p className="text-center text-gray-700">
                {currency}
                {item.amount}
              </p>
              <div className="flex justify-center space-x-3">
                {item.cancelled ? (
                  <p className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full w-fit">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full w-fit">
                    Completed
                  </p>
                ) : (
                  <div>
                    <button onClick={() => cancelAppointment(item._id)}>
                      <img
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-10 cursor-pointer hover:opacity-75 hover:scale-125 transition-all duration-300 ease-in-out"
                      />
                    </button>
                    <button onClick={() => completeAppointment(item._id)}>
                      <img
                        src={assets.tick_icon}
                        alt="Confirm"
                        className="w-10  cursor-pointer hover:opacity-75 hover:scale-125 transition-all duration-300 ease-in-out"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointments;
