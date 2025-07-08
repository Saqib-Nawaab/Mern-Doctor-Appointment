import React, { useState, useEffect, use } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
function NavBar() {
  
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-container") &&
        !event.target.closest(".mobile-menu")
      ) {
        setShowDropdown(false);
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center text-sm py-4 px-4 sm:px-6 border-b border-gray-200 bg-white relative">
      <Link to="/">
        <img
          className="w-36 sm:w-44 cursor-pointer"
          src={assets.logo}
          alt="Logo"
        />
      </Link>
      <ul className="hidden md:flex gap-6 font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                : "text-gray-600 hover:text-indigo-600 pb-1 transition-colors duration-200"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                : "text-gray-600 hover:text-indigo-600 pb-1 transition-colors duration-200"
            }
          >
            All Doctors
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                : "text-gray-600 hover:text-indigo-600 pb-1 transition-colors duration-200"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                : "text-gray-600 hover:text-indigo-600 pb-1 transition-colors duration-200"
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="flex gap-4 items-center">
        {token && userData ? (
          <div className="relative dropdown-container">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex gap-2 cursor-pointer items-center"
              aria-label="Toggle profile dropdown"
            >
              <img
                className="w-8 h-8 rounded-full"
                src={userData.image}
                alt="Profile"
              />
              <img
                className="w-3 h-3"
                src={assets.dropdown_icon}
                alt="Dropdown"
              />
            </div>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 text-base text-gray-600 z-[999] min-w-48 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col gap-3 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                    setShowMenu(false);
                  }}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-200"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                    setShowMenu(false);
                  }}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-200"
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors duration-200"
                >
                  Log Out
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 hidden md:block"
          >
            Create Account
          </button>
        )}

        <button
          className="md:hidden w-8 h-8 mobile-menu"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle mobile menu"
        >
          <img
            src={showMenu ? assets.cross_icon : assets.menu_icon}
            alt={showMenu ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
        </button>
      </div>

      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-white z-[1000] flex flex-col mobile-menu transform transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Link to="/" onClick={() => setShowMenu(false)}>
              <img className="w-36" src={assets.logo} alt="Logo" />
            </Link>
            <button
              onClick={() => setShowMenu(false)}
              className="w-8 h-8"
              aria-label="Close mobile menu"
            >
              <img
                src={assets.cross_icon}
                alt="Close menu"
                className="w-full h-full"
              />
            </button>
          </div>
          <ul className="flex flex-col justify-center items-center text-center gap-4 p-4">
            <li>
              <NavLink
                to="/"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium text-base"
                    : "text-gray-600 font-medium text-base hover:text-indigo-600 transition-colors duration-200"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium text-base"
                    : "text-gray-600 font-medium text-base hover:text-indigo-600 transition-colors duration-200"
                }
              >
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium text-base"
                    : "text-gray-600 font-medium text-base hover:text-indigo-600 transition-colors duration-200"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium text-base"
                    : "text-gray-600 font-medium text-base hover:text-indigo-600 transition-colors duration-200"
                }
              >
                Contact
              </NavLink>
            </li>
            {!token && (
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium text-base hover:bg-indigo-700 transition-all duration-200 w-full text-left"
                >
                  Create Account
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
