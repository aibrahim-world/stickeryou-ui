import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://localhost:7244/customer';

function DeleteComponent({ onDelete }) {
  const [id, setId] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      onDelete(); // Refresh the list
      setId('');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h3>Delete Item</h3>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteComponent;