import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

function Sidebar() {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 px-4 py-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:min-h-screen md:w-64`}
      >
        {aToken && (
          <ul className="space-y-2">
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={assets.home_icon} alt="Home" className="w-5 h-5" />
              <p className="text-sm">Dashboard</p>
            </NavLink>

            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
              <p className="text-sm">Appointments</p>
            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
              <p className="text-sm">Add Doctor</p>
            </NavLink>

            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={assets.people_icon} alt="Doctor List" className="w-5 h-5" />
              <p className="text-sm">Doctor List</p>
            </NavLink>
          </ul>
        )}
        {dToken && (
          <ul className="space-y-2">
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={assets.home_icon} alt="Home" className="w-5 h-5" />
              <p className="text-sm">Dashboard</p>
            </NavLink>

            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
              <p className="text-sm">Appointments</p>
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-blue-100 ${
                  isActive ? "bg-blue-100 font-semibold text-blue-600" : "text-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <img src={assets.people_icon} alt="Profile" className="w-5 h-5" />
              <p className="text-sm">Profile</p>
            </NavLink>
          </ul>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Sidebar;