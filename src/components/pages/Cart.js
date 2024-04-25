import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/cart.css'; // Import cart-specific styles

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      "_id": "661ec1be0826b7be8a9e5602",
      "vendorID": 844872,
      "vehicleType": "scooty",
      "subVehicleCompany": "Activa 5G",
      "quantity": 43,
      "basePrice": 200,
      "pricePerHour": 100,
      "vehicleID": 716966,
      "createdAt": "2024-04-16T18:21:50.811Z",
      "updatedAt": "2024-04-25T12:04:45.206Z",
      "__v": 0,
      "quantity":1
  },
  {
      "_id": "661ec2c82042258b5af4d050",
      "vendorID": 844872,
      "vehicleType": "scooty",
      "subVehicleCompany": "Maestro",
      "quantity": 476,
      "basePrice": 200,
      "pricePerHour": 100,
      "vehicleID": 344688,
      "createdAt": "2024-04-16T18:26:16.028Z",
      "updatedAt": "2024-04-25T12:04:44.181Z",
      "__v": 0,
      "quantity":1
  },
  {
      "_id": "6628d13e079c7f5bb288cf54",
      "vendorID": 844872,
      "vehicleType": "scooty",
      "subVehicleCompany": "Fascino",
      "quantity": 500,
      "basePrice": 300,
      "pricePerHour": 150,
      "vehicleID": 381710,
      "createdAt": "2024-04-24T09:30:38.527Z",
      "updatedAt": "2024-04-25T05:59:32.569Z",
      "__v": 0,
      "quantity":1
  }
  ]);

  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Retrieve token from localStorage or wherever you store it
  //       const response = await axios.get('http://localhost:5000/api/get-cart', {
  //         headers: {
  //           'x-auth-token': token, // Include the token in the header
  //         },
  //       });

  //       // Map over the cart items and fetch vehicle details for each item
  //       const itemsWithDetails = await Promise.all(response.data.map(async (item) => {
  //         const vehicleID = item.VehicleID; // Correct the field name
  //         if (!vehicleID) {
  //           throw new Error('Vehicle ID is undefined');
  //         }
  //         const vehicleResponse = await axios.get(`http://localhost:5000/api/vehicle/${vehicleID}`);
  //         return {
  //           ...item,
  //           vehicle: vehicleResponse.data, // Add vehicle details to the item
  //         };
  //       }));

  //       setCartItems(itemsWithDetails);
  //     } catch (error) {
  //       console.error('Error fetching cart items:', error);
  //     }
  //   };

  //   fetchCartItems();
  // }, []);

  return (
    <div className="cart-container">
      <h2 className="cart-heading">Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src="https://bd.gaadicdn.com/processedimages/tvs/tvs-scooty-zest/494X300/tvs-scooty-zest6476deb7d6ae9.jpg" alt="" />
            <div className="item-details">
              
              {/* <h3>{item.vehicle.subVehicleCompany}</h3>
              <h3>{item.vehicle.subVehicleCompany}</h3>
              <p>Base Price: {item.vehicle.basePrice}</p>
              <p>Price Per Hour: {item.vehicle.pricePerHour}</p>
              <p>Quantity: {item.quantity}</p> */}
              <h2>Vendor Name</h2>
              <p className="name">Vehicle Name <span className='qt'>x1</span></p>
              <div className="details">
                <div>
                  <p>Date</p>
                  <input aria-label="Date" type="date" />
                </div>
                <div>
                  <p>Time</p>
                  <input aria-label="Time" type="time" />
                </div>
                <div>
                  <p>Price</p>
                  <div className="pr">
                    ₹800
                  </div>
                </div>
              </div>
              {/* Add more item details as needed */}
            </div>
            <div className="delete">
              <svg height="20" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.60128 4.40486e-05C3.54176 -0.000815761 3.48266 0.0109195 3.42744 0.0345684C3.37221 0.0582174 3.32195 0.0933086 3.27957 0.137804C3.23719 0.1823 3.20354 0.235313 3.18057 0.293766C3.1576 0.352218 3.14578 0.414945 3.14578 0.478303H0.45576C0.396215 0.477407 0.337095 0.489115 0.281838 0.512748C0.226581 0.53638 0.176289 0.571466 0.133883 0.615965C0.0914767 0.660464 0.0578033 0.71349 0.0348196 0.771961C0.0118358 0.830431 0 0.893181 0 0.956562C0 1.01994 0.0118358 1.08269 0.0348196 1.14116C0.0578033 1.19963 0.0914767 1.25266 0.133883 1.29716C0.176289 1.34166 0.226581 1.37674 0.281838 1.40038C0.337095 1.42401 0.396215 1.43572 0.45576 1.43482H8.54424C8.60379 1.43572 8.6629 1.42401 8.71816 1.40038C8.77342 1.37674 8.82371 1.34166 8.86612 1.29716C8.90852 1.25266 8.9422 1.19963 8.96518 1.14116C8.98816 1.08269 9 1.01994 9 0.956562C9 0.893181 8.98816 0.830431 8.96518 0.771961C8.9422 0.71349 8.90852 0.660464 8.86612 0.615965C8.82371 0.571466 8.77342 0.53638 8.71816 0.512748C8.6629 0.489115 8.60379 0.477407 8.54424 0.478303H5.85422C5.85422 0.414945 5.8424 0.352218 5.81943 0.293766C5.79646 0.235313 5.76281 0.1823 5.72043 0.137804C5.67805 0.0933086 5.62779 0.0582174 5.57256 0.0345684C5.51734 0.0109195 5.45824 -0.000815761 5.39872 4.40486e-05H3.60128ZM0.45576 2.39134V10.0435C0.45576 10.572 0.857937 11 1.35448 11H7.64552C8.14206 11 8.54424 10.572 8.54424 10.0435V2.39134H0.45576ZM3.15192 4.78263C3.26684 4.78263 3.38178 4.82925 3.46963 4.92275L4.5 6.01938L5.53037 4.92275C5.70607 4.73575 5.99009 4.73575 6.16579 4.92275C6.34149 5.10975 6.34149 5.41204 6.16579 5.59904L5.13542 6.69567L6.16579 7.7923C6.34149 7.9793 6.34149 8.28159 6.16579 8.46859C6.07817 8.56185 5.96312 8.60871 5.84808 8.60871C5.73304 8.60871 5.61799 8.56185 5.53037 8.46859L4.5 7.37196L3.46963 8.46859C3.38201 8.56185 3.26696 8.60871 3.15192 8.60871C3.03688 8.60871 2.92183 8.56185 2.83421 8.46859C2.65851 8.28159 2.65851 7.9793 2.83421 7.7923L3.86458 6.69567L2.83421 5.59904C2.65851 5.41204 2.65851 5.10975 2.83421 4.92275C2.92206 4.82925 3.037 4.78263 3.15192 4.78263Z" fill="#FD4242"/>
              </svg>

              </div>
          </div>
        ))}
      </div>
      <button className="proceed-to-checkout">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
