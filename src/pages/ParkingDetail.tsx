
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useParking } from "@/context/ParkingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, Clock, Car, Euro, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ParkingMap from "@/components/ParkingMap";
import { useIsMobile } from "@/hooks/use-mobile";

const ParkingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getParkingById } = useParking();
  const isMobile = useIsMobile();
  const parking = getParkingById(id || "");

  if (!parking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Parking non trouvé</p>
          <Button onClick={() => navigate("/")}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const availabilityPercentage = (parking.availableSpots / parking.totalSpots) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage >= 30) return "bg-parking-available";
    if (availabilityPercentage > 0) return "bg-parking-limited";
    return "bg-parking-unavailable";
  };

  const getAvailabilityText = () => {
    if (availabilityPercentage >= 30) return "Disponible";
    if (availabilityPercentage > 0) return "Places limitées";
    return "Complet";
  };

  // Mock coordinates for the parking location
  const parkingLocation = {
    lat: 48.8534 + (Number(parking.id) * 0.01), // Generated based on ID to create different positions
    lng: 2.3488 + (Number(parking.id) * 0.01),
    name: parking.name,
    id: parking.id,
    availableSpots: parking.availableSpots,
    totalSpots: parking.totalSpots
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-48 bg-primary-blue/90">
        <button 
          className="absolute top-4 left-4 bg-white rounded-full p-2 z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <div className="absolute bottom-0 w-full px-4 pb-4">
          <h1 className="text-2xl font-bold text-white">{parking.name}</h1>
          <div className="flex items-center text-white/90 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{parking.address}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        <Card className="mb-4">
          <CardContent className="p-0 overflow-hidden">
            <ParkingMap 
              center={[parkingLocation.lat, parkingLocation.lng]}
              zoom={15}
              locations={[parkingLocation]}
              height={isMobile ? "200px" : "250px"}
              singleLocation={true}
            />
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Disponibilité</span>
              <Badge className={`${getAvailabilityColor()} text-white`}>
                {getAvailabilityText()}
              </Badge>
            </div>
            
            <Progress 
              value={availabilityPercentage} 
              className={`h-2 ${
                availabilityPercentage >= 30 
                  ? "bg-gray-200" 
                  : availabilityPercentage > 0 
                    ? "bg-parking-limited/20" 
                    : "bg-parking-unavailable/20"
              }`}
            />
            
            <div className="flex justify-between text-sm mt-2">
              <span>Places libres: {parking.availableSpots}</span>
              <span>Places totales: {parking.totalSpots}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <span>Horaires</span>
              </div>
              <span>{parking.openTime} - {parking.closeTime}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Euro className="w-5 h-5 mr-2 text-gray-500" />
                <span>Tarif</span>
              </div>
              <span>{parking.price}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <span>Distance</span>
              </div>
              <span>{parking.distance}</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button className="flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" />
            <span>Y aller</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2"
            onClick={() => navigate(`/parking/${parking.id}/book`)}
            disabled={parking.availableSpots === 0}
          >
            <Car className="w-4 h-4" />
            <span>Réserver</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetail;
