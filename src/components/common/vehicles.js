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

  const handleIncrementCounter = () => {
    if(quantity<vehicle.quantity){
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
          </div>
          <div className="right">
            <IncrementDecrementBtn
              quantity={quantity}
              onIncrement={handleIncrementCounter}
              onDecrement={handleDecrementCounter}
            />
          </div>
        </div>
        <div className="bottom">Add to Cart</div>
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
