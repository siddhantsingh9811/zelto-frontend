import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [vendors, setVendors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showSortingOptions, setShowSortingOptions] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  useEffect(() => {
    // Fetch vendors on component mount
    axios
      .get("http://localhost:5000/api/getvendors")
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });

    // Fetch locations using geolocation API
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //             const { latitude, longitude } = position.coords;
    //             axios.get(`http://api.example.com/locations?lat=${latitude}&lon=${longitude}`)
    //                 .then(response => {
    //                     setLocations(response.data.locations);
    //                 })
    //                 .catch(error => {
    //                     console.error('Error fetching locations:', error);
    //                 });
    //         },
    //         error => {
    //             console.error('Error getting geolocation:', error);
    //         }
    //     );
    // } else {
    //     console.error('Geolocation is not supported by this browser.');
    // }
  }, []);

  const removeActive = () => {
    let ul = document.getElementById("foo");
    let items = ul.getElementsByTagName("div");
    for (const element of items) {
      element.classList.remove("active");
    }
  };

  const VendorCard = ({ vendor }) => {
    return (
      <Link
        to={`/vendor/${vendor.vendorID}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <div className="vendor">
          <div className="img" />
          <div className="info">
            <div className="left">
              <h3>{vendor.name}</h3>
              <p className="text-5">{vendor.distance}200m away</p>
            </div>
            <div className="right">
              <div className="rating">4.3</div>
              <p className="text-6">9-5 pm </p>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const handleClick = (event) => {
    removeActive();
    event.currentTarget.classList.toggle("active");
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const sortVendors = (vendors) => {
    switch (sortBy) {
      case "name":
        return vendors.sort((a, b) => a.name.localeCompare(b.name));
      case "price":
        return vendors.sort((a, b) => a.price - b.price);
      case "distance":
        return vendors.sort((a, b) => a.distance - b.distance);
      default:
        return vendors;
    }
  };

  const filteredVendors = sortVendors(
    vendors.filter((vendor) => {
      const name = vendor.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return name.includes(query);
    })
  );

  return (
    <div className="home">
      <div className="location">
        <h4>Find a ride in</h4>
        <div
          className="cur"
          onClick={() => setShowLocationDropdown(!showLocationDropdown)}
        >
          <svg
            className="l"
            preserveAspectRatio="true"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.1833 7.04168C16.3083 3.19168 12.95 1.45834 9.99996 1.45834C9.99996 1.45834 9.99996 1.45834 9.99162 1.45834C7.04996 1.45834 3.68329 3.18334 2.80829 7.03334C1.83329 11.3333 4.46662 14.975 6.84996 17.2667C7.73329 18.1167 8.86662 18.5417 9.99996 18.5417C11.1333 18.5417 12.2666 18.1167 13.1416 17.2667C15.525 14.975 18.1583 11.3417 17.1833 7.04168ZM9.99996 11.2167C8.54996 11.2167 7.37496 10.0417 7.37496 8.59168C7.37496 7.14168 8.54996 5.96668 9.99996 5.96668C11.45 5.96668 12.625 7.14168 12.625 8.59168C12.625 10.0417 11.45 11.2167 9.99996 11.2167Z"
              fill="#826ce9"
            />
          </svg>
          <h1>{selectedLocation || "Bidholi, Uttarakhand"}</h1>
          <svg
            className="a"
            preserveAspectRatio="true"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowLocationDropdown(!showLocationDropdown)}
          >
            <path
              d="M13 1L7 7.46154L1 1"
              stroke="black"
              strokeLinecap="square"
            />
          </svg>
        </div>
        {showLocationDropdown && (
          <select value={selectedLocation} onChange={handleLocationChange}>
            <option value="" disabled hidden>
              Select Location
            </option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        )}
        <div className="search">
          <div className="sub">
            <svg
              className="s"
              preserveAspectRatio="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6781 12.9272C15.8884 11.2756 16.4305 9.22795 16.1959 7.19385C15.9613 5.15975 14.9673 3.28923 13.4128 1.95652C11.8583 0.623812 9.85794 -0.0728086 7.81187 0.00602988C5.76581 0.0848684 3.82496 0.933352 2.37762 2.38173C0.930277 3.83011 0.0831823 5.77156 0.00580795 7.81768C-0.0715664 9.8638 0.626485 11.8637 1.96031 13.4172C3.29413 14.9708 5.16536 15.9634 7.19963 16.1966C9.23389 16.4297 11.2812 15.8861 12.9319 14.6746H12.9306C12.9673 14.7246 13.0081 14.7725 13.0531 14.8184L17.8654 19.6307C18.0998 19.8652 18.4178 19.9971 18.7493 19.9972C19.0809 19.9973 19.399 19.8657 19.6335 19.6313C19.8681 19.3969 19.9999 19.079 20 18.7474C20.0001 18.4158 19.8685 18.0978 19.6341 17.8633L14.8218 13.0509C14.7771 13.0057 14.7291 12.9651 14.6781 12.9272ZM15.0006 8.12238C15.0006 9.02518 14.8227 9.91915 14.4773 10.7532C14.1318 11.5873 13.6254 12.3452 12.987 12.9836C12.3486 13.6219 11.5907 14.1283 10.7567 14.4738C9.92258 14.8193 9.02862 14.9971 8.12582 14.9971C7.22301 14.9971 6.32905 14.8193 5.49497 14.4738C4.66089 14.1283 3.90302 13.6219 3.26464 12.9836C2.62626 12.3452 2.11987 11.5873 1.77438 10.7532C1.4289 9.91915 1.25108 9.02518 1.25108 8.12238C1.25108 6.29908 1.97538 4.55047 3.26464 3.2612C4.55391 1.97194 6.30252 1.24764 8.12582 1.24764C9.94911 1.24764 11.6977 1.97194 12.987 3.2612C14.2763 4.55047 15.0006 6.29908 15.0006 8.12238Z"
                fill="black"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search"
              style={{
                border: "5px",
                borderRadius: "10px",
                padding: "20px 10px", // Adjusted padding to 20px top and bottom, 10px left and right
                width: "calc(100% - 20px)", // Adjusted width to cover till the end of the grey background
                fontSize: "16px",
                outline: "none",
              }}
            />
          </div>
          <div
            className="f-button"
            onClick={() => setShowSortingOptions(!showSortingOptions)}
          >
            <svg
              className="f"
              preserveAspectRatio="true"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9675 7.56249C17.4258 7.56249 17.7925 7.19583 17.7925 6.73749V2.47499C17.7925 2.01666 17.4258 1.64999 16.9675 1.64999C16.5092 1.64999 16.1425 2.01666 16.1425 2.47499V6.73749C16.1425 7.18666 16.5183 7.56249 16.9675 7.56249Z"
                fill="#1A1E25"
              />
              <path
                d="M11 14.4375C10.5417 14.4375 10.175 14.8042 10.175 15.2625V19.525C10.175 19.9833 10.5417 20.35 11 20.35C11.4583 20.35 11.825 19.9833 11.825 19.525V15.2625C11.825 14.8133 11.4583 14.4375 11 14.4375Z"
                fill="#1A1E25"
              />
              <path
                d="M5.03252 7.56249C5.49085 7.56249 5.85752 7.19583 5.85752 6.73749V2.47499C5.85752 2.01666 5.49085 1.64999 5.03252 1.64999C4.57419 1.64999 4.20752 2.01666 4.20752 2.47499V6.73749C4.20752 7.18666 4.57419 7.56249 5.03252 7.56249Z"
                fill="#1A1E25"
              />
              <path
                d="M6.7375 9.32251H3.3275C2.86917 9.32251 2.5025 9.68918 2.5025 10.1475C2.5025 10.6058 2.86917 10.9725 3.3275 10.9725H4.2075V19.525C4.2075 19.9833 4.57417 20.35 5.0325 20.35C5.49083 20.35 5.8575 19.9833 5.8575 19.525V10.9725H6.7375C7.19583 10.9725 7.5625 10.6058 7.5625 10.1475C7.5625 9.68918 7.18667 9.32251 6.7375 9.32251Z"
                fill="#1A1E25"
              />
              <path
                d="M18.6725 9.32251H15.2625C14.8042 9.32251 14.4375 9.68918 14.4375 10.1475C14.4375 10.6058 14.8042 10.9725 15.2625 10.9725H16.1425V19.525C16.1425 19.9833 16.5092 20.35 16.9675 20.35C17.4258 20.35 17.7925 19.9833 17.7925 19.525V10.9725H18.6725C19.1308 10.9725 19.4975 10.6058 19.4975 10.1475C19.4975 9.68918 19.1308 9.32251 18.6725 9.32251Z"
                fill="#1A1E25"
              />
              <path
                d="M12.705 11.0275H11.825V2.47499C11.825 2.01666 11.4583 1.64999 11 1.64999C10.5416 1.64999 10.175 2.01666 10.175 2.47499V11.0275H9.29497C8.83664 11.0275 8.46997 11.3942 8.46997 11.8525C8.46997 12.3108 8.83664 12.6775 9.29497 12.6775H12.705C13.1633 12.6775 13.53 12.3108 13.53 11.8525C13.53 11.3942 13.1633 11.0275 12.705 11.0275Z"
                fill="#1A1E25"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="filter">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="distance">Sort by Distance</option>
        </select>
      </div>
      <h2>What do you need?</h2>
      <div className="buttons" id="foo">
        <div className="button active" role="button" onClick={handleClick}>
          Scooty
        </div>
        <div className="button" role="button" onClick={handleClick}>
          Bike
        </div>
        <div className="button" role="button" onClick={handleClick}>
          Car
        </div>
      </div>
      <h2 className="heading">Near your location</h2>
      <div className="vendor-list">
        {filteredVendors.map((vendor, index) => (
          <VendorCard key={index} vendor={vendor} />
        ))}
      </div>
    </div>
  );
};

export default Home;
