import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from './SearchComponent/SearchComponent';
import UploadComponent from './UploadComponent/UploadComponent';
import UpdateComponent from './UpdateComponent/UpdateComponent';
import DeleteComponent from './DeleteComponent/DeleteComponent';

const API_URL = 'https://localhost:7244/';

function App() {
  const [items, setItems] = useState([]);

  // Fetch all items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      <SearchComponent onSearch={fetchItems} />
      <UploadComponent onAdd={fetchItems} />
      <UpdateComponent onUpdate={fetchItems} />
      <DeleteComponent onDelete={fetchItems} />

      <h2>Items List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;