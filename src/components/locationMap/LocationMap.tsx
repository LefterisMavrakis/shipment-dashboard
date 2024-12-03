import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix missing marker icons in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerRetina,
});

type LocationMapProps = {
  lat: number;
  lng: number;
  shipmentId: string;
};

const LocationMap = ({ lat, lng, shipmentId }: LocationMapProps) => {
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[lat, lng]}>
          <Popup>
            Shipment ID: <strong>{shipmentId}</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
