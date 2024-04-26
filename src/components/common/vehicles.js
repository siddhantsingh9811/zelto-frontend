import { useEffect, useState } from "react";
import "../../styles/vehicles.css";

const IncrementDecrementBtn = ({ quantity, onIncrement, onDecrement }) => {
  return (
    <div className="btn-group">
      <button className="increment-btn" onClick={onIncrement}>
        <span className="material-symbols-outlined">+</span>
      </button>
      <p>{quantity}</p>
      <button className="decrement-btn" onClick={onDecrement}>
        <span className="material-symbols-outlined">-</span>
      </button>
    </div>
  );
};

const Vehicle = ({ vehicle, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleIncrementCounter = () => {
    if (quantity < vehicle.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      onQuantityChange(vehicle._id, quantity + 1);
    }
  };

  const handleDecrementCounter = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onQuantityChange(vehicle._id, quantity - 1);
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleAddToCart = () => {
    if (quantity > 0 && selectedDate !== "" && selectedTime !== "") {
      // You need to replace this with your actual endpoint URL
      const apiUrl = "http://localhost:5000/api/add-cart/";

      // Construct the payload
      const payload = {
        vehicleID: vehicle.vehicleID,
        quantity: quantity,
        date: selectedDate,
        time: selectedTime,
      };

      // Make a POST request to your API
      const token = localStorage.getItem("token");

      // Construct headers object with token
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": token,
      };

      // Make the POST request with the headers
      fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response if needed
          console.log("Add to cart response:", data);
          showAlertWithMessage("Item added to cart successfully.", "success");
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      if (quantity === 0) {
        showAlertWithMessage("Please select a quantity.", "error");
      } else if (selectedDate === "") {
        showAlertWithMessage("Please select a date.", "error");
      } else if (selectedTime === "") {
        showAlertWithMessage("Please select a time.", "error");
      }
    }
  };

  const showAlertWithMessage = (message, type) => {
    setAlertMessage({ message, type });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide alert after 3 seconds
  };

  return (
    <div className="vehicle">
      <div className="img"></div>
      <div className="text">
        <div className="top">
          <div className="left">
            <h2>{vehicle.subVehicleCompany}</h2>
            <p className="units">
              Units: <span>{vehicle.quantity}</span>
            </p>
            <p className="price">
              Price: {vehicle.pricePerHour}/Hour • {vehicle.basePrice}/Hour
            </p>
            <div className="pickers">
              <input
                aria-label="Date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <input
                aria-label="Time"
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>
          </div>
          <div className="right">
            <IncrementDecrementBtn
              quantity={quantity}
              onIncrement={handleIncrementCounter}
              onDecrement={handleDecrementCounter}
            />
          </div>
        </div>
        <div className="bottom" onClick={handleAddToCart}>
          Add to Cart
        </div>
        {showAlert && (
          <div
            className={`alert ${
              alertMessage.type === "success" ? "success" : "error"
            }`}
          >
            {alertMessage.message}
          </div>
        )}
      </div>
    </div>
  );
};

const Vehicles = ({ vehicles }) => {
  const [vehicleQuantities, setVehicleQuantities] = useState({});

  useEffect(() => {
    // Initialize vehicle quantities with quantities from the API response
    const initialQuantities = {};
    vehicles.forEach((vehicle) => {
      initialQuantities[vehicle._id] = vehicle.quantity;
    });
    setVehicleQuantities(initialQuantities);
  }, [vehicles]);

  const handleQuantityChange = (vehicleId, newQuantity) => {
    setVehicleQuantities((prevQuantities) => ({
      ...prevQuantities,
      [vehicleId]: newQuantity,
    }));
  };

  return (
    <div className="vehicles">
      {vehicles.map((vehicle, index) => (
        <Vehicle
          key={index}
          vehicle={vehicle}
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </div>
  );
};

export default Vehicles;
