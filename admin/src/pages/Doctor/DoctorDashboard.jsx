import React, { useEffect } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { AdminContext } from "../../context/AdminContext";
function DoctorDashboard() {
  const {
    dashData,
    dToken,
    getDashData,
    setDashData,
    cancelAppointment,
    completeAppointment,
    getAppointments,
  } = useContext(DoctorContext);

  const { slotDateFormat } = useContext(AppContext);

  // const { cancelAppointmentByAdmin } = useContext(AdminContext);

  const currency = "$";

  useEffect(() => {
    if (dToken) {
      getDashData();
      getAppointments();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <img
                src={assets.earning_icon}
                alt="Doctors"
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {currency}
                  {dashData.earning}
                </p>
                <p className="text-gray-600 text-sm">Earnings</p>
              </div>
            </div>

            <div className="flex items-center bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <img
                src={assets.appointments_icon}
                alt="Appointments"
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.appointments}
                </p>
                <p className="text-gray-600 text-sm">Appointments</p>
              </div>
            </div>

            <div className="flex items-center bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <img
                src={assets.patients_icon}
                alt="Patients"
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.patients}
                </p>
                <p className="text-gray-600 text-sm">Patients</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <img
                src={assets.list_icon}
                alt="Latest Booking"
                className="w-7 h-7 mr-3"
              />
              <p className="text-xl font-semibold text-gray-800">
                Latest Bookings
              </p>
            </div>

            <div className="space-y-4">
              {dashData.latestAppointment.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-indigo-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}
                      className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.userData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {slotDateFormat(item.slotDate)}
                      </p>
                    </div>
                  </div>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default DoctorDashboard;
