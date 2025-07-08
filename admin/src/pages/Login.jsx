import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from "react-toastify";
function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);

  const { setDToken } = useContext(DoctorContext);

  const submitHanndler = async (a) => {
    a.preventDefault();
    try {
      if (state == "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        } else {
          toast.error("Invalid Credentials");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHanndler}
        className="max-w-md w-full text-center bg-white shadow-lg rounded-2xl p-8"
      >
        <h1 className="text-gray-900 text-3xl font-semibold mb-2">
          <span className="text-blue-500">{state}</span> Login
        </h1>
        <p className="text-gray-500 text-sm mb-8">Please log in to continue</p>

        <div className="mb-4">
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-full h-12 pl-4 pr-2 focus-within:ring-2 focus-within:ring-indigo-300 transition-all">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email address"
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 rounded-full h-12 pl-4 pr-2 focus-within:ring-2 focus-within:ring-indigo-300 transition-all">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-full text-white bg-blue-500 cursor-pointer hover:bg-blue-600 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all font-medium"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p className="text-sm text-gray-600 mt-4">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-indigo-500 hover:underline cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 mt-4">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-indigo-500 hover:underline cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
