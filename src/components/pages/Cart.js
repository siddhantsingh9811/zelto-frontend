import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/cart.css"; // Import cart-specific styles
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import SplashScreen from "../common/SplashScreen"; // Import SplashScreen component

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/get-cart", {
          headers: {
            "x-auth-token": token,
          },
        });
        // toast.success("Cart items fetched successfully", {
        //   position: "bottom-center",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
        // console.log(response);
        // Map over the cart items and fetch vehicle details for each item
        const itemsWithDetails = await Promise.all(
          response.data.map(async (item) => {
            const vehicleID = item.VehicleID; // Correct the field name
            if (!vehicleID) {
              throw new Error("Vehicle ID is undefined");
            }
            const vehicleResponse = await axios.get(
              `http://localhost:5000/api/vehicle/${vehicleID}`
            );
            return {
              ...item,
              vehicle: vehicleResponse.data, // Add vehicle details to the item
            };
          })
        );

        setCartItems(itemsWithDetails);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error(error.message || "Error fetching cart items");
      }
    };

    fetchCartItems();
  }, []);

  const navigate = useNavigate();

  return (
    <motion.div
      className="cart-container"
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.3 }}
    >
      {loading ? (
        <SplashScreen /> // Render SplashScreen while loading
      ) : (
        <>
          <h2 className="cart-heading">Cart</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src="https://bd.gaadicdn.com/processedimages/tvs/tvs-scooty-zest/494X300/tvs-scooty-zest6476deb7d6ae9.jpg"
                  alt=""
                />
                <div className="item-details">
                  <h2>{item.vehicle.vendorName}</h2>
                  <p className="name">
                    {item.vehicle.subVehicleCompany}{" "}
                    <span className="qt">x{item.quantity}</span>
                  </p>
                  <div className="details">
                    <div>
                      <p>{item.date}</p>
                    </div>
                    &nbsp; &nbsp; &nbsp;
                    <div>
                      <p>{item.time}</p>
                    </div>
                    &nbsp; &nbsp; &nbsp;
                    <div>
                      <p>Price</p>
                      <div className="pr">
                        ₹{item.vehicle.pricePerHour * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="delete">
                  <svg
                    height="20"
                    viewBox="0 0 9 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path for delete icon */}
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <button
            className="proceed-to-checkout"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
