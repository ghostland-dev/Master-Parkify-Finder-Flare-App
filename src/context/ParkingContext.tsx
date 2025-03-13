
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ParkingItemProps } from "@/components/ParkingItem";

// Extended data for map coordinates
interface ParkingData extends ParkingItemProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Données de stationnement de démonstration
const mockParkingData: ParkingData[] = [
  {
    id: "1",
    name: "Parking Centre-Ville",
    address: "15 Rue de la République",
    distance: "350m",
    price: "2,50€/h",
    availableSpots: 45,
    totalSpots: 120,
    openTime: "06:00",
    closeTime: "23:00",
    coordinates: {
      lat: 48.8634,
      lng: 2.3588
    }
  },
  {
    id: "2",
    name: "Parking de la Gare",
    address: "Place de la Gare",
    distance: "500m",
    price: "3,00€/h",
    availableSpots: 12,
    totalSpots: 200,
    openTime: "05:00",
    closeTime: "00:00",
    coordinates: {
      lat: 48.8734,
      lng: 2.3688
    }
  },
  {
    id: "3",
    name: "Parking Souterrain Marché",
    address: "8 Place du Marché",
    distance: "750m",
    price: "2,00€/h",
    availableSpots: a0,
    totalSpots: 80,
    openTime: "07:00",
    closeTime: "20:00",
    coordinates: {
      lat: 48.8434,
      lng: 2.3388
    }
  },
  {
    id: "4",
    name: "Parking Opéra",
    address: "3 Avenue de l'Opéra",
    distance: "1,2km",
    price: "4,00€/h",
    availableSpots: 5,
    totalSpots: 60,
    openTime: "07:30",
    closeTime: "22:30",
    coordinates: {
      lat: 48.8834,
      lng: 2.3788
    }
  },
  {
    id: "5",
    name: "Parking du Parc",
    address: "Allée des Tilleuls",
    distance: "1,5km",
    price: "1,50€/h",
    availableSpots: 30,
    totalSpots: 50,
    openTime: "08:00",
    closeTime: "19:00",
    coordinates: {
      lat: 48.8334,
      lng: 2.3288
    }
  },
];

interface ParkingContextType {
  parkings: ParkingData[];
  loading: boolean;
  searchParking: (query: string) => void;
  getParkingById: (id: string) => ParkingData | undefined;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider = ({ children }: { children: ReactNode }) => {
  const [parkings, setParkings] = useState<ParkingData[]>(mockParkingData);
  const [loading, setLoading] = useState(false);

  const searchParking = (query: string) => {
    setLoading(true);
    // Dans une application réelle, cela serait un appel API
    setTimeout(() => {
      const filteredParkings = mockParkingData.filter(
        (parking) =>
          parking.name.toLowerCase().includes(query.toLowerCase()) ||
          parking.address.toLowerCase().includes(query.toLowerCase())
      );
      setParkings(filteredParkings);
      setLoading(false);
    }, 500);
  };

  const getParkingById = (id: string) => {
    return mockParkingData.find((parking) => parking.id === id);
  };

  return (
    <ParkingContext.Provider value={{ parkings, loading, searchParking, getParkingById }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParking must be used within a ParkingProvider");
  }
  return context;
};
