
import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParking } from "@/context/ParkingContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const { parkings, searchParking } = useParking();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onSearch={searchParking} />
      
      <main className="flex-1 pt-28 pb-20 px-4 flex flex-col">
        {/* Carte (placeholder) */}
        <div className="relative w-full h-60 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
          <div className="absolute inset-0 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/2.3488,48.8534,12,0/600x400?access_token=pk.placeholder')] bg-center bg-cover">
              {/* Mapbox serait utilisé ici dans une version complète */}
            </div>
          </div>
          <div className="z-10 text-center">
            <Navigation className="h-8 w-8 mx-auto mb-2 text-primary-blue" />
            <span className="bg-white px-3 py-1 rounded-full text-sm shadow-md">
              Carte des parkings à proximité
            </span>
          </div>
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
          className="mt-4"
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
