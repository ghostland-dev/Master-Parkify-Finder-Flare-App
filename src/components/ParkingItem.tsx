
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Clock, Euro } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface ParkingItemProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  price: string;
  availableSpots: number;
  totalSpots: number;
  openTime: string;
  closeTime: string;
}

const ParkingItem = ({
  id,
  name,
  address,
  distance,
  price,
  availableSpots,
  totalSpots,
  openTime,
  closeTime,
}: ParkingItemProps) => {
  const navigate = useNavigate();
  const availabilityPercentage = (availableSpots / totalSpots) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage >= 30) return "bg-parking-available";
    if (availabilityPercentage > 0) return "bg-parking-limited";
    return "bg-parking-unavailable";
  };

  const getAvailabilityText = () => {
    if (availabilityPercentage >= 30) return "Disponible";
    if (availabilityPercentage > 0) return "Limité";
    return "Complet";
  };

  return (
    <Card 
      className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/parking/${id}`)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{address}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>{openTime} - {closeTime}</span>
            </div>
          </div>
          <Badge className={`${getAvailabilityColor()} text-white`}>
            {getAvailabilityText()}
          </Badge>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center">
            <Car className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-sm">
              {availableSpots} / {totalSpots} places
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-1">{price}</span>
            <Euro className="w-4 h-4 text-gray-500" />
          </div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-right">
          <span>{distance}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParkingItem;
