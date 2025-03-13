
import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation } from "lucide-react";

// Fix for default marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Location {
  lat: number;
  lng: number;
  name: string;
  id: string;
  availableSpots: number;
  totalSpots: number;
}

interface ParkingMapProps {
  center?: [number, number];
  zoom?: number;
  locations?: Location[];
  height?: string;
  singleLocation?: boolean;
  onMarkerClick?: (id: string) => void;
}

const SetViewOnLoad = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const ParkingMap = ({
  center = [48.8534, 2.3488],
  zoom = 13,
  locations = [],
  height = "400px",
  singleLocation = false,
  onMarkerClick
}: ParkingMapProps) => {
  
  const getMarkerColor = (availableSpots: number, totalSpots: number) => {
    const percentage = (availableSpots / totalSpots) * 100;
    if (percentage >= 30) return "green";
    if (percentage > 0) return "orange";
    return "red";
  };

  const createCustomIcon = (color: string) => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10C5 5.58172 8.58172 2 13 2C17.4183 2 21 5.58172 21 10C21 11.8487 20.3729 13.551 19.3199 14.9056L13 23L6.6801 14.9056C5.62708 13.551 5 11.8487 5 10Z" fill="white" stroke="white" stroke-width="2"/>
              </svg>
            </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });
  };

  const handleMarkerClick = (id: string) => {
    if (onMarkerClick) {
      onMarkerClick(id);
    }
  };

  return (
    <div style={{ height, width: "100%" }} className="rounded-lg overflow-hidden shadow-md">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetViewOnLoad center={center} zoom={zoom} />
        
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createCustomIcon(getMarkerColor(loc.availableSpots, loc.totalSpots))}
            eventHandlers={{
              click: () => handleMarkerClick(loc.id),
            }}
          >
            <Popup>
              <div className="text-sm font-medium">{loc.name}</div>
              <div className="text-xs mt-1">
                Places: {loc.availableSpots}/{loc.totalSpots}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ParkingMap;
