import React, { useState, useEffect } from 'react';
import '../../styles/home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const removeActive = () => {
        let ul = document.getElementById("foo");
        let items = ul.getElementsByTagName("div");
        for (const element of items) {
            element.classList.remove('active');
        }
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [vendors, setVendors] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        // Fetch vendors on component mount
        axios.get('http://localhost:5000/api/getvendors')
            .then(response => {
                setVendors(response.data);
            })
            .catch(error => {
                console.error('Error fetching vendors:', error);
            });

        // Fetch locations using geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    axios.get(`http://api.example.com/locations?lat=${latitude}&lon=${longitude}`)
                        .then(response => {
                            setLocations(response.data.locations);
                        })
                        .catch(error => {
                            console.error('Error fetching locations:', error);
                        });
                },
                error => {
                    console.error('Error getting geolocation:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const VendorCard = ({ vendor }) => {
        return (
            <Link to={`/vendor/${vendor.vendorID}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
        event.currentTarget.classList.toggle('active');
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const sortVendors = (vendors) => {
        switch (sortBy) {
            case 'name':
                return vendors.sort((a, b) => a.name.localeCompare(b.name));
            case 'price':
                return vendors.sort((a, b) => a.price - b.price);
            case 'distance':
                return vendors.sort((a, b) => a.distance - b.distance);
            default:
                return vendors;
        }
    };

    const filteredVendors = sortVendors(vendors.filter(vendor => {
        const name = vendor.name.toLowerCase();
        const query = searchQuery.toLowerCase();
        return name.includes(query);
    }));

    return (
        <div className="home">
            <div className="location">
                <h4>Find a ride in</h4>
                <div className="cur">
                    <select value={selectedLocation} onChange={handleLocationChange}>
                        <option value="" disabled hidden>Select Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>
                <div className="search">
                    <div className="sub">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="Search"
                            style={{
                                border: '5px',
                                borderRadius: '10px',
                                padding: '20px 10px', // Adjusted padding to 20px top and bottom, 10px left and right
                                width: 'calc(100% - 20px)', // Adjusted width to cover till the end of the grey background
                                fontSize: '16px',
                                outline: 'none'
                            }}
                        />
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
            <div className="buttons" id='foo'>
                <div className="button active" role="button" onClick={handleClick}>Scooty</div>
                <div className="button" role="button" onClick={handleClick}>Bike</div>
                <div className="button" role="button" onClick={handleClick}>Car</div>
            </div>
            <h2 className='heading'>Near your location</h2>
            <div className="vendor-list">
                {filteredVendors.map((vendor, index) => (
                    <VendorCard key={index} vendor={vendor} />
                ))}
            </div>
        </div>
    );
};

export default Home;
