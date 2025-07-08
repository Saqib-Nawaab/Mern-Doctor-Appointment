import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointments() {
  const { docId } = useParams();
  const {
    doctors,
    navigate,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
  } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysofWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getAvailableSlots = async () => {
    setDocSlot([]);
    let today = new Date();
    let slotData = {};

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      let dateKey = currentDate.toDateString();

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setMinutes(0);
        currentDate.setHours(10);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formatedDate = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formatedDate;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formatedDate)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formatedDate,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotData[dateKey] = timeSlots;
    }

    setDocSlot(slotData);
    setSlotIndex(Object.keys(slotData)[0]);
  };

  const fetchDocInfo = () => {
    const doc = doctors.find((item) => item._id === docId);
    setDocInfo(doc);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Please Login First to Book Appointment");
      return navigate("/login");
    }

    try {
      const date = docSlot[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success("Appointment Booked ");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  return (
    docInfo && (
      <div className="py-12 px-6 sm:px-10 md:px-16 lg:px-20 min-h-screen">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-1/3">
            <img
              className="w-full h-auto rounded-xl shadow-lg object-cover bg-blue-400"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {docInfo.name}
              </h2>
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-5 h-5"
              />
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {docInfo.degree} &nbsp;•&nbsp; {docInfo.speciality}
            </p>

            <p className="text-blue-600 font-semibold mb-6">
              {docInfo.experience}
            </p>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <img src={assets.info_icon} alt="About" className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-800">About</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-700 font-medium mt-4 leading-relaxed">
              Appointment Fee :{" "}
              <span className="font-semibold text-blue-400">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 font-medium text-gray-500">
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Booking Slots
          </p>

          <div className="flex flex-wrap justify-center sm:ml-52 sm:justify-start gap-3">
            {Object.keys(docSlot).map((item, index) => {
              const date = new Date(item);
              return (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(item);
                    setSlotTime("");
                  }}
                  className={`py-4 px-5 min-w-[80px] rounded-lg cursor-pointer text-center border transition-all duration-300
                    ${
                      slotIndex === item
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-gray-200 text-gray-800 hover:bg-blue-100"
                    }`}
                >
                  <p className="text-sm font-semibold">
                    {daysofWeek[date.getDay()]}
                  </p>
                  <p className="text-sm">{date.getDate()}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
              {docSlot[slotIndex] && docSlot[slotIndex].length > 0 ? (
                docSlot[slotIndex].map((slot, i) => (
                  <div>
                    <button
                      key={i}
                      onClick={() => setSlotTime(slot.time)}
                      className={`px-4 py-2.5 rounded-lg text-center cursor-pointer border transition-all duration-300
                      font-medium text-sm sm:text-base
                      ${
                        slotTime === slot.time
                          ? "bg-blue-600 text-white border-blue-700 shadow-md"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400 hover:shadow-sm"
                      }`}
                      aria-pressed={slotTime === slot.time}
                    >
                      {slot.time.toLowerCase()}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm col-span-full text-center">
                  No slots available for this date.
                </p>
              )}
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button
              onClick={bookAppointment}
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 text-base sm:text-lg"
            >
              Book for Appointment
            </button>
          </div>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointments;
