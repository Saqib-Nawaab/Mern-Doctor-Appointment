import React, { useEffect, useState, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorProfile() {
  const { dToken, profileData, getProfileData, backendUrl } =
    useContext(DoctorContext);

  const currency = "$";

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const updateProfile = async (dat) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        dat,
        {
          headers: {
            dToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="w-full flex justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 m-4 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-300 shadow-md">
              <img
                src={profileData.image}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {profileData.name}
            </h2>
          </div>

          <hr className="border-gray-200" />

          <div className="text-center space-y-2">
            <p className="text-gray-600 font-medium text-base">
              {profileData.degree} — {profileData.speciality}
            </p>
            <span className="inline-block px-3 py-1 text-sm bg-indigo-100 text-indigo-700 font-medium rounded-full">
              {profileData.experience}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
            <p className="text-sm text-gray-600">{profileData.about}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              Appointment Fee:
              <span className="ml-2 text-green-600 font-bold">
                {currency}
                {isEditing ? (
                  <input
                    type="number"
                    value={editData?.fees}
                    onChange={(e) =>
                      setEditData((pre) => ({ ...pre, fees: e.target.value }))
                    }
                    className="border rounded px-2 py-1 text-sm ml-2"
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              Address
            </h3>
            <p className="text-sm text-gray-800">
              {isEditing ? (
                <input
                  type="text"
                  value={editData?.address.line1}
                  onChange={(e) =>
                    setEditData((pre) => ({
                      ...pre,
                      address: {
                        ...pre.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  className="border border-green-500 rounded px-2 py-1 text-sm w-full"
                />
              ) : (
                profileData.address.line1
              )}
            </p>
            <p className="text-sm text-gray-800 mt-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editData?.address.line2}
                  onChange={(e) =>
                    setEditData((pre) => ({
                      ...pre,
                      address: {
                        ...pre.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  className="border border-green-500 rounded px-2 py-1 text-sm w-full"
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg ">
            <input
              type="checkbox"
              checked={isEditing ? editData?.available : profileData.available}
              onChange={(e) =>
                isEditing &&
                setEditData((pre) => ({
                  ...pre,
                  available: e.target.checked,
                }))
              }
              className="form-checkbox h-4 w-4 text-green-600 focus:ring-green-500 rounded transition duration-150"
            />
            <p
              className={`text-lg font-medium ${
                isEditing
                  ? editData?.available
                    ? "text-green-600"
                    : "text-red-500"
                  : profileData.available
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {isEditing
                ? editData?.available
                  ? "Available"
                  : "Unavailable"
                : profileData.available
                ? "Available"
                : "Unavailable"}
            </p>
          </div>

          <div className="flex justify-center">
            {isEditing ? (
              <button
                onClick={() => {
                  updateProfile(editData);
                  setIsEditing(false);
                }}
                className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditData({
                    fees: profileData.fees,
                    address: {
                      line1: profileData.address.line1,
                      line2: profileData.address.line2,
                    },
                    available: profileData.available,
                  });
                }}
                className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default DoctorProfile;
