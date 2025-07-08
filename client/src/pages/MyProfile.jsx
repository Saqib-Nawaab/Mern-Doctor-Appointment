import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
function MyProfile() {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
    try {
      setLoading(true);

    const proceedingToastId = toast.info("Proceeding... Please wait", {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
      toastId: "proceeding",
    });
      const formData = new FormData();

      image && formData.append("image", image);
      formData.append("name", userData.name);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
          },
        }
      );

      toast.dismiss("proceeding");

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setEditMode(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss("proceeding");
      toast.error(error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    userData && (
      <div className="min-h-screen flex items-center justify-center  py-8">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            {editMode ? (
              <label htmlFor="image" className="relative group cursor-pointer">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <img
                    src={image ? "" : assets.upload_icon}
                    alt=""
                    className="w-8 h-8"
                  />
                </div>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100"
              />
            )}

            {editMode ? (
              <input
                type="text"
                value={userData.name}
                placeholder="Enter your name"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="text-2xl font-semibold cursor-pointer text-center border border-gray-300 rounded-lg p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData.name}
              </h2>
            )}
          </div>

          <hr className="border-gray-200" />

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-medium text-gray-700">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-blue-400">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                {editMode ? (
                  <input
                    type="text"
                    value={userData.phone}
                    placeholder="Enter your phone"
                    onChange={(e) =>
                      setUserData({ ...userData, phone: e.target.value })
                    }
                    className="border cursor-pointer border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                ) : (
                  <p className="text-blue-400">{userData.phone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-600">Address</p>
                {editMode ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={userData.address.line1}
                      placeholder="Enter your Street, City"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            line1: e.target.value,
                          },
                        })
                      }
                      className="border cursor-pointer border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    />
                    <input
                      type="text"
                      value={userData.address.line2}
                      placeholder="Enter your State, Country"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          address: {
                            ...userData.address,
                            line2: e.target.value,
                          },
                        })
                      }
                      className="border cursor-pointer border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800">{userData.address.line1}</p>
                    <p className="text-gray-800">{userData.address.line2}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-medium text-gray-700">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Gender</p>
                {editMode ? (
                  <select
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                    className="border cursor-pointer border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-800">{userData.gender}</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Date of Birth
                </p>
                {editMode ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData({ ...userData, dob: e.target.value })
                    }
                    className="border cursor-pointer border-gray-300 rounded-lg p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                  />
                ) : (
                  <p className="text-gray-800">{userData.dob}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            {editMode ? (
              <button
                onClick={updateUserProfile}
                className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Information"
                )}
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default MyProfile;
