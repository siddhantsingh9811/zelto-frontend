import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheckCircle, FaRegClock, FaCircle } from "react-icons/fa";
import Modal from "./Modal";
import SplashScreen from "../common/SplashScreen"; // Import SplashScreen component
import "../../styles/history.css";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading status

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/my-bookings",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setBookings(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      toast.error("Error fetching bookings");
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.status === 200) {
        fetchBookings();
      }
    } catch (error) {
      toast.error("Error canceling booking");
      console.error("Error canceling booking:", error);
    }
  };

  const handleCompleteRide = async (bookingID) => {
    setSelectedBooking(String(bookingID)); // Ensure bookingId is a string
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  const handleConfirmRide = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/complete-ride/${selectedBooking}`,
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.status === 200) {
        fetchBookings();
        setIsModalOpen(false);
        toast.success("Ride completed successfully");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error("Error completing ride:", error);
    }
  };

  return (
    <motion.div
      className="history-container max-w-screen-lg mx-auto py-4 px-2"
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
    >
      <h2 className="history-heading text-2xl font-bold text-center mb-4 flex items-center justify-center">
        <FaCircle className="mr-2 text-green-500" />
        Active Bookings
      </h2>
      {loading ? ( // Render SplashScreen while loading
        <SplashScreen />
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings</p>
      ) : (
        <div className="history-list">
          {bookings.map((booking) => (
            <div
              className="history-item bg-white shadow-xl rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center"
              key={booking._id}
            >
              <img
                src="https://bd.gaadicdn.com/processedimages/tvs/tvs-scooty-zest/494X300/tvs-scooty-zest6476deb7d6ae9.jpg"
                alt=""
                className="w-24 h-24 rounded-md object-cover mb-4 md:mb-0 md:mr-4"
              />
              <div className="item-details">
                {booking.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <h2 className="flex items-center">
                      {item.subVehicleCompany}{" "}
                      <FaRegClock className="ml-2 text-gray-500" />
                    </h2>
                    <p className="name">
                      Quantity: {item.quantity}{" "}
                      <span className="qt">Price: ₹{item.price}</span>
                    </p>
                    <div className="details flex">
                      <div className="">
                        <p>Start Time: {item.startTime}</p>
                      </div>
                    </div>
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="buttons mt-2 md:ml-auto w-full md:w-auto">
                <button
                  className="btn-cancel bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full md:w-auto"
                  onClick={() => handleCancelBooking(booking.bookingID)}
                >
                  Cancel Booking
                </button>
                <button
                  className="btn-confirm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ml-2 mt-2 md:mt-0 w-full md:w-auto flex items-center"
                  onClick={() => handleCompleteRide(booking.bookingID)}
                >
                  Complete Ride <FaCheckCircle className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Confirm Ride Completion</p>
          <p>Are you sure you want to complete this ride?</p>
          <div className="flex justify-center mt-4">
            <button
              className="btn-cancel bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4 mt-5 h-10"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="btn-confirm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleConfirmRide}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default History;
