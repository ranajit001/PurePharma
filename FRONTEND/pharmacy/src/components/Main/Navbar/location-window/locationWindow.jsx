// locationWindow.jsx
import React, { useState } from 'react';
import './locationWindow.css';
import { fetchPincodeFromLocation } from './locationUtils';

const LocationWindow = ({ isOpen, onUpdatePincode }) => {
  const [inputPincode, setInputPincode] = useState('');

  if (!isOpen) return null;

  const handlePincodeUpdate = () => {
    if (/^\d{6}$/.test(inputPincode)) {
      onUpdatePincode(inputPincode);
    } else {
      alert('Please enter a valid pincode');
    }
  };

  const handleFetchLocation = async () => {
    try {
      const pincode = await fetchPincodeFromLocation();
      if (pincode) {
        setInputPincode(pincode);
        onUpdatePincode(pincode);
      } else {
        alert('Could not retrieve pincode. Try manually entering it.');
      }
    } catch (error) {
      alert('Error fetching location: ' + error.message);
    }
  };

  return (
    <div className="location-window">
      <button className="fetch-location-btn" onClick={handleFetchLocation}>
        Grant Current Location
      </button>
      <div className="update-pincode">
        <input
          type="text"
          placeholder="Enter your pincode"
          className="pincode-input"
          value={inputPincode}
          onChange={(e) => setInputPincode(e.target.value)}
        />
        <button className="update-pincode-btn" onClick={handlePincodeUpdate}>
          Update Pincode
        </button>
      </div>
    </div>
  );
};

export default LocationWindow;
