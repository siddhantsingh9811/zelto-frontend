import { useEffect, useState } from "react";
import "../../styles/vehicles.css";

const IncrementDecrementBtn = ({ minValue = 0, maxValue = 100 }) => {
    const [count, setCount] = useState(minValue);
  
    const handleIncrementCounter = () => {
      if (count < maxValue) {
        setCount((prevState) => prevState + 1);
      }
    };
  
    const handleDecrementCounter = () => {
      if (count > minValue) {
        setCount((prevState) => prevState - 1);
      }
    };
  
    return (
      <div className="btn-group">
        <button className="increment-btn" onClick={handleIncrementCounter}>
          <span class="material-symbols-outlined">+</span>
        </button>
        
        <p>{count}</p>
        
        <button className="decrement-btn" onClick={handleDecrementCounter}>
          <span class="material-symbols-outlined">-</span>
        </button>
      </div>
    );
  };

const Vehicle = ({vehicle:vehicle})=>{
    const [quantity, setQuantity] = useState(0);
    return (
        <div className="vehicle">
            <div className="img"></div>
            <div className="text">
                <div className="top">
                    <div className="left">
                        <h2>{vehicle.vehicle_name}</h2>
                        <p className="units">Units: <span>{vehicle.quantity}</span></p>
                        <p className="price">Price: {vehicle.hourly_price}/Hour • {vehicle.daily_price}/Hour</p>
                    </div>
                    <div className="right">
                        <IncrementDecrementBtn maxValue={vehicle.quantity}/>
                    </div>
                </div>
                <div className="bottom">Add to Cart</div>
            </div>
        </div>
    )
}

const Vehicles = ({vehicles:vehicles}) => {
    
    return ( 
        <div className="vehicles">
            {vehicles.map((vehicle,index)=>(
                <Vehicle vehicle={vehicle} key={index}/>
            ))}
        </div>
     );
}
 
export default Vehicles;