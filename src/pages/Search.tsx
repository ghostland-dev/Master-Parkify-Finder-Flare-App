
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ParkingItem from "@/components/ParkingItem";
import { useParking } from "@/context/ParkingContext";
import { Filter, Loader2, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Search = () => {
  const { parkings, loading, searchParking } = useParking();
  const [sortBy, setSortBy] = useState<string>("distance");
  const [maxPrice, setMaxPrice] = useState<number[]>([10]);
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [filteredParkings, setFilteredParkings] = useState(parkings);

  useEffect(() => {
    // Charger tous les parkings au chargement
    searchParking("");
  }, []);

  useEffect(() => {
    // Filtrer et trier les parkings
    let filtered = [...parkings];
    
    // Filtre par disponibilité
    if (onlyAvailable) {
      filtered = filtered.filter((parking) => parking.availableSpots > 0);
    }
    
    // Filtre par prix max (conversion approximative de "2,50€/h" en nombre)
    filtered = filtered.filter((parking) => {
      const priceNumeric = parseFloat(parking.price.replace('€/h', '').replace(',', '.'));
      return priceNumeric <= maxPrice[0];
    });
    
    // Tri
    if (sortBy === "distance") {
      filtered.sort((a, b) => {
        const distA = parseFloat(a.distance.replace('km', '').replace('m', '').replace(',', '.'));
        const distB = parseFloat(b.distance.replace('km', '').replace('m', '').replace(',', '.'));
        return distA - distB;
      });
    } else if (sortBy === "price") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('€/h', '').replace(',', '.'));
        const priceB = parseFloat(b.price.replace('€/h', '').replace(',', '.'));
        return priceA - priceB;
      });
    } else if (sortBy === "availability") {
      filtered.sort((a, b) => {
        const availA = a.availableSpots / a.totalSpots;
        const availB = b.availableSpots / b.totalSpots;
        return availB - availA;
      });
    }
    
    setFilteredParkings(filtered);
  }, [parkings, sortBy, maxPrice, onlyAvailable]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onSearch={searchParking} />
      
      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Trouver un parking</h2>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="price">Prix</SelectItem>
                <SelectItem value="availability">Disponibilité</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1 h-9">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtres</SheetTitle>
                  <SheetDescription>
                    Affinez votre recherche de parking
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Prix maximum (€/h)</h3>
                    <Slider
                      defaultValue={[5]}
                      max={10}
                      step={0.5}
                      value={maxPrice}
                      onValueChange={setMaxPrice}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0€</span>
                      <span>{maxPrice[0]}€</span>
                      <span>10€</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="available-only">Places disponibles uniquement</Label>
                      <p className="text-sm text-gray-500">Masquer les parkings complets</p>
                    </div>
                    <Switch 
                      id="available-only" 
                      checked={onlyAvailable}
                      onCheckedChange={setOnlyAvailable}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
          </div>
        ) : filteredParkings.length > 0 ? (
          <div className="space-y-4">
            {filteredParkings.map((parking) => (
              <ParkingItem key={parking.id} {...parking} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Aucun parking ne correspond à vos critères</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setMaxPrice([10]);
                setOnlyAvailable(false);
                setSortBy("distance");
              }}
              className="mt-2"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </main>
      
      <Navbar />
    </div>
  );
};

export default Search;
