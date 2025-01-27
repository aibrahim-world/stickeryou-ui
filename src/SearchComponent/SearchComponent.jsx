import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:7244/customer';

function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_URL}?name=${searchTerm}`);
      setSearchResults(response.data);
      console.log('Search Result:', response.data);
      onSearch(); // Refresh the list
    } catch (error) {
      console.error('Error searching item:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            {/* Render your search result here */}
            <p>{result.id}---{result.name}----{result.state}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default SearchComponent;