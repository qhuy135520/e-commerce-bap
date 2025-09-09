import { useReducer } from "react";
import { fetchAddressLocation } from "@/services/apiAddress";

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

const initialState = {
  isLoading: false,
  position: null,
  address: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: null };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        position: action.payload.position,
        address: action.payload.address,
        error: null,
      };
    case "ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export function useGeolocation(defaultPosition = null) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    position: defaultPosition,
  });

  async function getPosition() {
    if (!navigator.geolocation) {
      dispatch({ type: "ERROR", payload: new Error("Your browser does not support geolocation") });
      return;
    }

    dispatch({ type: "LOADING" });

    try {
      const pos = await getCurrentPosition();
      const { latitude: lat, longitude: lng } = pos.coords;

      const addr = await fetchAddressLocation(lat, lng);

      dispatch({
        type: "SUCCESS",
        payload: { position: { lat, lng }, address: addr },
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err instanceof Error ? err : new Error("Failed to get location") });
    }
  }

  return { ...state, getPosition };
}
