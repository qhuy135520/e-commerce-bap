import { useState } from "react";

import { fetchAddressLocation } from "@/services/apiAddress";

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  async function getPosition() {
    if (!navigator.geolocation) {
      setError(new Error("Your browser does not support geolocation"));
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const pos = await getCurrentPosition();
      const { latitude: lat, longitude: lng } = pos.coords;
      setPosition({ lat, lng });

      const addr = await fetchAddressLocation(lat, lng);
      setAddress(addr);
    } catch (err) {
      setError(new Error("Failed to get location"));
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, position, address, error, getPosition };
}
