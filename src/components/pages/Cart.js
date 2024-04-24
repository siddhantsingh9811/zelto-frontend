import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/cart.css'; // Import cart-specific styles

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage or wherever you store it
        const response = await axios.get('http://localhost:5000/api/get-cart', {
          headers: {
            'x-auth-token': token, // Include the token in the header
          },
        });

        // Map over the cart items and fetch vehicle details for each item
        const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
          const vehicleID = item.VehicleID; // Correct the field name
          if (!vehicleID) {
            throw new Error('Vehicle ID is undefined');
          }
          const vehicleResponse = await axios.get(`http://localhost:5000/api/vehicle/${vehicleID}`);
          return {
            ...item,
            vehicle: vehicleResponse.data, // Add vehicle details to the item
          };
        }));

        setCartItems(itemsWithDetails);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <div className="img"></div>
            <div className="item-details">
              <h3>{item.vehicle.subVehicleCompany}</h3>
              <p>Base Price: {item.vehicle.basePrice}</p>
              <p>Price Per Hour: {item.vehicle.pricePerHour}</p>
              <p>Quantity: {item.quantity}</p>
              {/* Add more item details as needed */}
            </div>
          </div>
        ))}
      </div>
      {/* Add checkout button or other cart functionality */}
    </div>
  );
};

export default Cart;
