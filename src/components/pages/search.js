import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/getvendors')
            .then(response => {
                setVendors(response.data); 
            })
            .catch(error => {
                console.error('Error fetching vendors:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = vendors.filter(vendor => {
            // Filter logic based on vendor name or any other criteria
            return vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredVendors(filtered);
    }, [searchQuery, vendors]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return ( 
        <div className="search-page">
            <h2>Search for Scooties</h2>
            <input 
                type="text" 
                value={searchQuery} 
                onChange={handleInputChange} 
                placeholder="Search for scooties..."
            />
            <div className="vendor-list">
                {filteredVendors.map((vendor, index) => (
                    <div key={index} className="vendor">
                        {/* Display vendor details */}
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default SearchPage;
