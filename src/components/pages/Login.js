import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Logged in successfully");
        setUsername("");
        setPassword("");
        navigate("/home");
      } else {
        console.log("Error in login");
        toast.error("Error in login");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col justify-center items-center px-6 py-8 mx-4 bg-gray-100 rounded-xl shadow-md"
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
    >
      <div className="sm:max-w-md w-full">
        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
          <FaEnvelope className="inline-block mr-2 text-indigo-600" />
          Sign in to your Zelto account
        </h2>
      </div>

      <div className="mt-8 sm:max-w-sm w-full space-y-6">
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              <FaUserAlt className="inline-block mr-2 text-indigo-600" />
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                value={username}
                name="username"
                type="username"
                autoComplete="username"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                <FaLock className="inline-block mr-2 text-indigo-600" />
                Password
              </label>
              <div className="text-sm">
                <a href="/forgotpassword" className="font-semibold text-[#755CEC] hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;