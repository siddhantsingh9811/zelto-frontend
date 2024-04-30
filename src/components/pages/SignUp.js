import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });

      toast.success("Account created successfully");

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data);
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
          Create Zelto Account
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
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="username"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              <FaEnvelope className="inline-block mr-2 text-indigo-600" />
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              <FaLock className="inline-block mr-2 text-indigo-600" />
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign In
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default SignUp;