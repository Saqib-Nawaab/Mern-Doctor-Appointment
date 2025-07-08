import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
function Dashboard() {
  const { aToken, getDashData, dashData, cancelAppointmentByAdmin } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5 min-h-screen py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-10 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
              <img
                src={assets.doctor_icon}
                alt="Doctors"
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {dashData.doctors}
                </p>
                <p className="text-gray-600 text-sm">Doctors</p>
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
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {slotDateFormat(item.slotDate)}
                      </p>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-500 font-semibold">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 font-semibold">Completed</p>
                  ) : (
                    <img
                      src={assets.cancel_icon}
                      onClick={() => cancelAppointmentByAdmin(item._id)}
                      alt="Cancel"
                      className="w-6 h-6 cursor-pointer hover:scale-125 transition-transform duration-300"
                    />
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

export default Dashboard;
