import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password",
        { email }
      );

      setShowEmailInput(false);
      setShowOtpInput(true);
      setShowTimer(true);
      toast.success(response.data.message || "OTP sent to your email");

      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
        setShowTimer(false);
      }, 60000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data || "Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        { email, otp }
      );

      setShowOtpInput(false);
      setShowNewPasswordInput(true);
      toast.success(response.data.message || "OTP Verified");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message || "Invalid OTP");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reset-password",
        {
          email,
          newPassword,
          confirmPassword,
        }
      );

      if (!response.data) {
        toast.error("Failed to reset password");
        throw new Error("Failed to reset password");
      }

      setShowNewPasswordInput(false);
      setShowSuccessMessage(true);
      toast.success(response.data.message || "Password updated successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data || "Failed to reset password");
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setShowTimer(false);
    }
  }, [timeLeft]);

  return (
    <motion.div
      className="flex min-h-screen flex-col justify-center items-center px-6 py-8 mx-4 bg-gray-100 rounded-xl shadow-md"
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
    >
      <div className="sm:max-w-sm w-full">
        <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
          <FaEnvelope className="inline-block mr-2 text-indigo-600" />
          Forgot Password
        </h2>
      </div>

      <div className="mt-8 sm:max-w-sm w-full space-y-6">
        {showEmailInput && (
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleEmailSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <FaEnvelope className="inline-block mr-2 text-indigo-600" />
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-3xl bg-[#755CEC] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {showOtpInput && (
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleOtpSubmit}
          >
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <FaLock className="inline-block mr-2 text-indigo-600" />
                Enter OTP
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  value={otp}
                  name="otp"
                  type="text"
                  autoComplete="off"
                  required
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-3xl bg-[#755CEC] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Verify OTP
              </button>
            </div>
          </form>
        )}

        {showNewPasswordInput && (
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={handlePasswordSubmit}
          >
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <FaLock className="inline-block mr-2 text-indigo-600" />
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  value={newPassword}
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                <FaLock className="inline-block mr-2 text-indigo-600" />
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  value={confirmPassword}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-3xl bg-[#755CEC] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        )}

        {showSuccessMessage && (
          <div className="mt-4 mx-auto w-full max-w-sm">
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative"
              role="alert"
            >
              <span className="block sm:inline">Password Updated</span>
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </a>
        </p>
      </div>
    </motion.div>
  );
}

export default ForgotPassword;
