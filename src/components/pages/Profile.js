import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaEnvelope,
  FaShoppingCart,
  FaMotorcycle,
  FaHistory,
  FaWallet,
  FaStar,
  FaCreditCard,
  FaAddressCard,
} from "react-icons/fa";
import "../../styles/UserProfile.css";
import SplashScreen from "../common/SplashScreen";

const Profile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current user data when component mounts
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    // Delete the token from localStorage
    localStorage.removeItem("token");

    // Refresh the page
    window.location.reload();
  };

  const fetchCurrentUser = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      // Make a GET request to fetch current user data
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/user/current", {
        headers: {
          "x-auth-token": token,
        },
      });

      const data = await response.json();
      console.log(data);
      setCurrentUser(data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setLoading(false); // Set loading to false if there's an error
      toast.error("Error fetching current user");
      console.error("Error fetching current user:", error);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className="user-profile-container"
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
    >
      {loading && <SplashScreen />} {/* Display splash screen while loading */}
      <div className="user-profile">
        <div className="profile-header">
          <FaUserCircle className="profile-picture" />
          <div className="profile-info">
            <h2 className="username">
              {currentUser ? currentUser.username : "Loading..."}
            </h2>
            <p className="email">
              <FaEnvelope className="email-icon" />
              {currentUser ? currentUser.email : "Loading..."}
            </p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <FaCalendarAlt className="detail-icon" />
            <p className="detail-text">
              Account Created At:{" "}
              {currentUser ? formatDate(currentUser.createdAt) : "Loading..."}
            </p>
          </div>
          <div className="detail-item">
            <FaShoppingCart className="detail-icon" />
            <p className="detail-text">
              Cart Items:{" "}
              {currentUser ? currentUser.cart.items?.length || 0 : "Loading..."}
            </p>
          </div>
        </div>
      </div>

      <div className="additional-components">
        <div className="component-item">
          <FaMotorcycle className="component-icon" />
          <h4 className="component-title">Book a Ride</h4>
          <p className="component-description">
            Book a ride and explore the city.
          </p>
        </div>

        <div className="component-item">
          <FaHistory className="component-icon" />
          <h4 className="component-title">Ride History</h4>
          <p className="component-description">View your past ride history.</p>
        </div>

        <div className="component-item">
          <FaWallet className="component-icon" />
          <h4 className="component-title">Wallet</h4>
          <p className="component-description">
            Manage your wallet and payment options.
          </p>
        </div>

        <div className="component-item">
          <FaStar className="component-icon" />
          <h4 className="component-title">Rate Us</h4>
          <p className="component-description">
            Rate our services and provide feedback.
          </p>
        </div>

        <div className="component-item">
          <FaCreditCard className="component-icon" />
          <h4 className="component-title">Payment Methods</h4>
          <p className="component-description">Manage your payment methods.</p>
        </div>

        <div className="component-item">
          <FaAddressCard className="component-icon" />
          <h4 className="component-title">Address Book</h4>
          <p className="component-description">Manage your saved addresses.</p>
        </div>
      </div>
      <br></br>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </motion.div>
  );
};

export default Profile;
