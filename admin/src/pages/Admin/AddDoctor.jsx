import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (a) => {
    a.preventDefault();

    const toastId = toast.loading("Processing, please wait...");

    try {
      if (!docImg) {
        toast.error("Please Upload Doctor Image");
      }

      const formdata = new FormData();

      formdata.append("image", docImg);
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("fees", Number(fees));
      formdata.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formdata.append("about", about);
      formdata.append("experience", experience);
      formdata.append("speciality", speciality);
      formdata.append("degree", degree);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formdata,
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        toast.update(toastId, {
          render: "Doctor added successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setAddress1("");
        setAddress2("");
        setAbout("");
        setExperience("1 Year");
        setSpeciality("General Physician");
        setDegree("");
      } else {
        toast.update(toastId, {
          render: data.message || "Something went wrong!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-600 mb-8">
          Add Doctor
        </h2>

        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className="w-24 h-24 object-cover rounded-[42px] border border-gray-300"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            hidden
            id="doc-img"
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Upload Doctor <br /> Image
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Doctor Name"
              value={name}
              className={`w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none transition-colors ${
                name ? "border-indigo-500 text-indigo-600" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter Doctor Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none transition-colors ${
                email ? "border-indigo-500 text-indigo-600" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none transition-colors ${
                password
                  ? "border-indigo-500 text-indigo-600"
                  : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-300 outline-none"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1}>{i + 1} Year</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fees
            </label>
            <input
              type="number"
              name="fees"
              placeholder="Enter Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              className={`w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none transition-colors ${
                fees ? "border-indigo-500 text-indigo-600" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speciality
            </label>
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-300 outline-none"
            >
              {[
                "General Physician",
                "Dermatologist",
                "Pediatrician",
                "Gynecologist",
                "Neurologist",
                "Gastroenterologist",
              ].map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>
            <input
              type="text"
              name="education"
              placeholder="Enter Education"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className={`w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none transition-colors ${
                degree ? "border-indigo-500 text-indigo-600" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address1"
              placeholder="Address Line 1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none transition-colors mb-2 ${
                address1
                  ? "border-indigo-500 text-indigo-600"
                  : "border-gray-300"
              }`}
            />
            <input
              type="text"
              name="address2"
              placeholder="Address Line 2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className={`w-full h-10 px-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none transition-colors ${
                address2
                  ? "border-indigo-500 text-indigo-600"
                  : "border-gray-300"
              }`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About
            </label>
            <textarea
              name="about"
              placeholder="Enter About Doctor"
              rows={5}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className={`w-full p-4 rounded-lg border bg-gray-50 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-300 outline-none resize-y transition-colors ${
                about ? "border-indigo-500 text-indigo-600" : "border-gray-300"
              }`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition font-medium"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;
