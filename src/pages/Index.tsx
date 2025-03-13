
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParking } from "@/context/ParkingContext";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import ParkingMap from "@/components/ParkingMap";

const Index = () => {
  const navigate = useNavigate();
  const { parkings, searchParking } = useParking();
  const isMobile = useIsMobile();

  // Generate mock parking locations based on existing parking data
  const parkingLocations = parkings.map((parking, index) => ({
    id: parking.id,
    name: parking.name,
    lat: 48.8534 + (index * 0.01), // Generated based on index to create different positions
    lng: 2.3488 + (index * 0.01),
    availableSpots: parking.availableSpots,
    totalSpots: parking.totalSpots
  }));

  const handleMarkerClick = (id: string) => {
    navigate(`/parking/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onSearch={searchParking} />
      
      <main className="flex-1 pt-28 pb-20 px-4 flex flex-col">
        {/* Carte interactive avec Leaflet */}
        <div className={`relative w-full ${isMobile ? 'h-52 sm:h-64' : 'h-64'} rounded-lg mb-4`}>
          <ParkingMap
            center={[48.8534, 2.3488]}
            zoom={13}
            locations={parkingLocations}
            height="100%"
            onMarkerClick={handleMarkerClick}
          />
        </div>

        {/* Parkings à proximité */}
        <h2 className="text-lg font-semibold mb-3">Parkings à proximité</h2>
        <div className="space-y-3">
          {parkings.slice(0, 3).map((parking) => (
            <div 
              key={parking.id} 
              className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-center"
              onClick={() => navigate(`/parking/${parking.id}`)}
            >
              <div>
                <h3 className="font-medium">{parking.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{parking.distance}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{parking.price}</div>
                <div className="text-xs text-gray-500">
                  {parking.availableSpots} places libres
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className={`mt-4 ${isMobile ? 'w-full sm:w-auto' : ''}`}
          onClick={() => navigate('/search')}
        >
          Voir tous les parkings
        </Button>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Index;
