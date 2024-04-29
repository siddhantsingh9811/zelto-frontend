import React, { useState, useEffect } from "react";
import "../../styles/checkout.css";
import axios from "axios";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Modal from "../pages/Modal";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/checkout", {
          headers: {
            "x-auth-token": token,
          },
        });

        const { cartItems, totalPrice } = response.data;
        setCartItems(cartItems);
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, []);

  const handleConfirmBooking = async (bookingId) => {
    console.log("Booking confirmed:", bookingId);
    setIsModalOpen(true); // Open the modal when confirming booking
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <motion.div
      className="bookings-container max-w-screen-lg mx-auto py-4 px-2"
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
    >
      <h2 className="bookings-heading text-2xl font-bold text-center mb-4">
        Checkout Page
      </h2>

      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" />
          Current Cart
        </h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">No items in the cart</p>
        ) : (
          <div className="bookings-list">
            {cartItems.map((item, index) => (
              <div
                className="booking-item bg-white shadow-md rounded-lg p-4 mb-4"
                key={index}
              >
                <div className="booking-details">
                  <div className="booking-info mb-2">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <p className="text-base font-bold">{item.date}</p>
                  </div>
                  <div className="booking-info mb-2">
                    <FaClock className="text-blue-500 mr-2" />
                    <p className="text-gray-600">{item.time}</p>
                  </div>
                </div>
                <div className="booking-vehicle bg-gray-100 p-2 rounded-lg mt-2">
                  <h4 className="text-base font-semibold mb-1">
                    Vehicle Details
                  </h4>
                  <p className="text-gray-600">{item.vehicleType}</p>
                  <p className="text-gray-600">{item.subVehicleCompany}</p>
                </div>
                <br></br>
                {item.itemTotalPrice && item.quantity && (
                  <p className="text-gray-900 font-medium">
                    Price: ₹{item.itemTotalPrice.toFixed(2)} ({item.quantity}{" "}
                    items)
                  </p>
                )}
              </div>
            ))}
            <div className="total-price-container mt-4">
              <h3 className="total-price-label text-lg font-semibold">
                Total Price:
              </h3>
              <p className="total-price text-xl font-bold">
                ₹{totalPrice.toFixed(2)}
              </p>
            </div>
            <button
              className="btn-confirm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-3 w-full"
              onClick={() => handleConfirmBooking()}
              style={{ width: "100%" }}
            >
              Confirm Booking
            </button>
          </div>
          
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
  <div>
    <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
    <p>You will be charged ₹{totalPrice.toFixed(2)}</p><p> at the vendor's location.</p>
    <button
      className="btn-confirm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-3 mr-3"
      onClick={() => {
        handleConfirmBooking();
        closeModal();
      }}
    >
      Confirm
    </button>
    
  </div>
</Modal>
    </motion.div>
  );
};

export default Checkout;
