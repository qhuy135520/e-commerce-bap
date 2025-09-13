import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "@/hooks/useGeolocation/useGeolocation";

// Vendor icon xanh
const vendorIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Marker đặc biệt cho current location
const currentLocationIcon = L.divIcon({
  html: `<div style="
    background-color: #ff3e3e;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
  "></div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function simplifyAddress(fullAddress) {
  if (!fullAddress) return "";
  const parts = fullAddress.split(",").map((p) => p.trim());
  const provinceKeywords = ["Thành phố", "Tỉnh", "City", "Province"];
  let provinceIndex = parts.findIndex((p) => provinceKeywords.some((k) => p.includes(k)));
  if (provinceIndex === -1) provinceIndex = parts.length - 1;
  return parts.slice(0, provinceIndex + 1).join(", ");
}

export default function SearchMap({ vendors }) {
  const [markers, setMarkers] = useState([]);
  const { position, getPosition } = useGeolocation({ lat: 16.0544, lng: 108.2022 }); // default Đà Nẵng

  useEffect(() => {
    async function fetchCoords() {
      const promises = [];

      for (const v of vendors) {
        if (v.addresses && v.addresses.length > 0) {
          for (const addr of v.addresses) {
            if (!addr.fullAddress) continue;

            const query = simplifyAddress(addr.fullAddress);
            const p = fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
              .then((res) => res.json())
              .then((data) => {
                if (data && data.length > 0) {
                  return {
                    vendorId: v.vendorId,
                    vendorName: v.vendorName,
                    phone: addr.phone,
                    fullAddress: addr.fullAddress,
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon),
                    addressId: addr.addressId,
                  };
                }
                return null;
              })
              .catch(() => null);

            promises.push(p);
          }
        }
      }

      const results = await Promise.all(promises);
      setMarkers(results.filter((r) => r !== null));
    }

    fetchCoords();

    getPosition();
  }, [vendors]);

  const center = position || { lat: 16.0544, lng: 108.2022 }; // nếu chưa lấy được thì mặc định Đà Nẵng

  return (
    <div style={{ height: "calc(100vh - 100px)", width: "100%" }}>
      <MapContainer center={[center.lat, center.lng]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* Marker current location */}
        {position && (
          <Marker position={[position.lat, position.lng]} icon={currentLocationIcon}>
            <Popup>
              <strong>Your Location</strong>
              <br />
              {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
            </Popup>
          </Marker>
        )}

        {/* Marker vendors */}
        {markers.map((m) => (
          <Marker key={`${m.vendorId}-${m.addressId}`} position={[m.lat, m.lon]} icon={vendorIcon}>
            <Popup>
              <div style={{ minWidth: "200px", fontSize: "1rem" }}>
                <strong style={{ fontSize: "1.2rem" }}>{m.vendorName}</strong>
                <br />
                {m.fullAddress}
                <br />
                📞 {m.phone || "N/A"}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
