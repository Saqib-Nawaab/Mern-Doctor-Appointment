import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
function MyAppointments() {
  const { token, backendUrl, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");

    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointment`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleStripePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/stripe-payment`,
        { appointmentId },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">My Appointments</h2>

      <div className="grid gap-6">
        {appointments.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row gap-6 border border-gray-200 rounded-lg shadow-sm p-5 bg-white"
          >
            <div className="flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.name}
                className="w-32 h-32 rounded-md object-cover"
              />
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-xl font-semibold text-gray-800">
                {item.docData.name}
              </p>
              <p className="text-gray-600">{item.docData.speciality}</p>
              <div className="text-gray-500 text-sm">
                <p>Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>
              <p className="text-sm text-gray-700 font-medium">
                <span className="text-gray-500 font-normal">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-center">
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => handleStripePayment(item._id)}
                  className="bg-indigo-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-600 transition"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && (
                <button className="border border-red-500 sm:min-w-48 text-red-500 px-4 py-2 rounded">
                  Appointment Cancelled
                </button>
              )}

              {item.payment && !item.cancelled && (
                <button className="border border-green-500 sm:min-w-48 text-green-600 px-4 py-2 rounded font-semibold">
                  Paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointments;
