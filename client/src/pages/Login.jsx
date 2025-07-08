import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setToken, backendUrl, token } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state == "login") {
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Welcome Back");
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("User added successfully");
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 w-full max-w-md bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
          <span className="text-indigo-600">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {state === "Sign Up" && (
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
              className="mt-1 w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="mt-1 w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            className="mt-1 w-full p-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            required
          />
        </div>

        <div className="text-sm text-center text-gray-600">
          {state === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-indigo-500 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-indigo-500 font-medium cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </p>
          )}
        </div>

        <button
          type="submit"
          onClick={() => console.log("Button clicked")}
          className="mt-2 bg-blue-500 hover:bg-indigo-600 cursor-pointer text-white py-2.5 rounded-md font-semibold transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
