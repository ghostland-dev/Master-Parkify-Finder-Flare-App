
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ParkingItem from "@/components/ParkingItem";
import { useParking } from "@/context/ParkingContext";
import { Loader2 } from "lucide-react";

const Search = () => {
  const { parkings, loading, searchParking } = useParking();

  useEffect(() => {
    // Charger tous les parkings au chargement
    searchParking("");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onSearch={searchParking} />
      
      <main className="flex-1 pt-28 pb-20 px-4">
        <h2 className="text-lg font-semibold mb-4">Trouver un parking</h2>
        
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
          </div>
        ) : parkings.length > 0 ? (
          <div className="space-y-4">
            {parkings.map((parking) => (
              <ParkingItem key={parking.id} {...parking} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-500">Aucun parking trouvé</p>
          </div>
        )}
      </main>
      
      <Navbar />
    </div>
  );
};

export default Search;
