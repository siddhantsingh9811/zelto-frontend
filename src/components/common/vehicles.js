import { useEffect, useState } from "react";
import "../../styles/vehicles.css";
import { toast } from "react-toastify";

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
    console.log(selectedDate);
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
          toast.success("Item added to cart successfully.");
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      if (quantity === 0) {
        toast.error("Please select a quantity.");
      } else if (selectedDate === "") {
        toast.error("Please select a date.");
      } else if (selectedTime === "") {
        toast.error("Please select a time.");
      }
    }
  };

  return (
    <div className="vehicle">
      <div
        className="img"
        style={{
          width: "100%",
          background: `url(${vehicle.vehicleImageURL})`,
          height: "20vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="text">
        <div className="top">
          <div className="left">
            <h2>{vehicle.subVehicleCompany}</h2>
            <p className="units">
              Available Units: <span>{vehicle.quantity}</span>
            </p>
            <br></br>
            <p className="price">
              Price: {vehicle.pricePerHour}/Hour • {vehicle.basePrice}/Hour
            </p>
            <br></br>
            <div className="pickers">
              <input
                aria-label="Date"
                type="date"
                value={selectedDate} // Bind value to selectedDate state
                onChange={handleDateChange}
              />
              <input
                aria-label="Time"
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>
            <br></br>
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
