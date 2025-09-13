import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function SearchMap() {
  return (
    <div style={{ height: "calc(110vh - 96px - 123px)", width: "100%" }}>
      <MapContainer center={[16.047079, 108.20623]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={[16.047079, 108.20623]} icon={customIcon}>
          <Popup>Đây là Đà Nẵng</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
