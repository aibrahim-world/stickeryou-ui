import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse'; // For parsing CSV files

const API_URL = 'https://localhost:7244/customer';


function UploadComponent({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid CSV file.');
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file to upload.');
      return;
    }

    setUploading(true);

    // Parse the CSV file
    Papa.parse(file, {
      header: true, // Assumes the first row is the header
      dynamicTyping: true, // Automatically convert data types
      complete: async (results) => {
        const parsedData = results.data; // Array of objects

        try {
          // Send the parsed data to the backend
          await axios.post(`${API_URL}/upload`, parsedData);
          alert('File uploaded successfully!');
          onUpload(); // Refresh the list
        } catch (error) {
          console.error('Error uploading file:', error);
          alert('Error uploading file. Please try again.');
        } finally {
          setUploading(false);
          setFile(null);
        }
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please check the file format.');
        setUploading(false);
      },
    });
  };

  return (
    <div>
      <h3>Upload CSV File</h3>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default UploadComponent;