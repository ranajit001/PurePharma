// locationUtils.js
export const fetchPincodeFromLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error('Geolocation is not supported by your browser'));
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const pincode = data.address?.postcode;
            resolve(pincode || null);
          } catch (error) {
            reject(new Error('Failed to retrieve location data'));
          }
        },
        (error) => reject(new Error('Unable to retrieve location: ' + error.message))
      );
    });
  };
  