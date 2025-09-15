import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const vendorIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const currentLocationIcon = L.divIcon({
  html: `<div class="current-location-marker"></div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const MapWrapper = styled.div`
  height: calc(120vh - 96px - 123px);
  width: 100%;

  .current-location-marker {
    background-color: #ff3e3e;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  .leaflet-popup-content-wrapper {
    min-width: 200px;
    font-size: 1rem;
  }

  .leaflet-popup-content strong {
    font-size: 1.2rem;
  }
`;

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
    }
  }, [center, map]);
  return null;
}

export default function SearchMap({ vendors, position, radius = 0 }) {
  const { t } = useTranslation(["searchmap"]);
  const center = position || { lat: 16.0544, lng: 108.2022 };

  const markers = vendors.flatMap(
    (v) =>
      v.addressesWithCoords?.map((addr) => ({
        vendorId: v.vendorId,
        vendorName: v.vendorName,
        phone: addr.phone,
        fullAddress: addr.fullAddress,
        lat: addr?.lat,
        lon: addr?.lon,
        addressId: addr.addressId,
      })) || []
  );

  return (
    <MapWrapper>
      <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        <RecenterMap center={center} />

        {position && (
          <>
            <Marker position={[position.lat, position.lng]} icon={currentLocationIcon}>
              <Popup>
                <strong>{t("map.yourLocation")}</strong>
                <br />
                {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
              </Popup>
            </Marker>

            {radius > 0 && (
              <Circle
                center={[position.lat, position.lng]}
                radius={radius * 1000}
                pathOptions={{ color: "#3b82f6", fillOpacity: 0.1 }}
              />
            )}
          </>
        )}

        {markers.map((m) => {
          if (m.lat && m.lon)
            return (
              <Marker key={`${m.vendorId}-${m.addressId}`} position={[m.lat, m.lon]} icon={vendorIcon}>
                <Popup>
                  <div>
                    <strong>{m.vendorName}</strong>
                    <br />
                    {m.fullAddress}
                    <br />
                    📞 {m.phone || "N/A"}
                  </div>
                </Popup>
              </Marker>
            );
        })}
      </MapContainer>
    </MapWrapper>
  );
}
