import { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search?query=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for scooters:', error);
        }
    };

    return (
        <div className="search-page">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for scooters..."
            />
            <button onClick={handleSearch}>Search</button>

            <div className="search-results">
                {searchResults.map((scooter, index) => (
                    <div key={index}>
                        <h3>{scooter.brand} {scooter.model}</h3>
                        <p>Price: {scooter.price}</p>
                        <p>Location: {scooter.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
