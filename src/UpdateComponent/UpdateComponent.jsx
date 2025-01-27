import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:7244/customer';

function UpdateComponent({ onUpdate }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleUpdate = async () => {
    try {
      const updatedItem = { name };
      await axios.put(`${API_URL}/${id}`, updatedItem);
      onUpdate(); // Refresh the list
      setId('');
      setName('');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <h3>Update Item</h3>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateComponent;