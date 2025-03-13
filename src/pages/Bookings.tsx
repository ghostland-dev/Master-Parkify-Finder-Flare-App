
import React from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  parkingName: string;
  address: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
  status: "active" | "upcoming" | "past";
}

const mockBookings: Booking[] = [
  {
    id: "1",
    parkingName: "Parking Centre-Ville",
    address: "15 Rue de la République",
    date: "Aujourd'hui",
    startTime: "14:30",
    endTime: "16:30",
    price: "5,00€",
    status: "active",
  },
  {
    id: "2",
    parkingName: "Parking de la Gare",
    address: "Place de la Gare",
    date: "Demain",
    startTime: "09:00",
    endTime: "11:00",
    price: "6,00€",
    status: "upcoming",
  },
  {
    id: "3",
    parkingName: "Parking Opéra",
    address: "3 Avenue de l'Opéra",
    date: "15/05/2023",
    startTime: "19:00",
    endTime: "22:00",
    price: "12,00€",
    status: "past",
  },
];

const getStatusBadge = (status: Booking["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-parking-available text-white">En cours</Badge>;
    case "upcoming":
      return <Badge className="bg-primary-blue text-white">À venir</Badge>;
    case "past":
      return <Badge className="bg-gray-400 text-white">Terminé</Badge>;
    default:
      return null;
  }
};

const Bookings = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-1 pt-28 pb-20 px-4">
        <h2 className="text-lg font-semibold mb-4">Mes réservations</h2>
        
        {mockBookings.length > 0 ? (
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className={`h-1 ${
                  booking.status === "active" 
                    ? "bg-parking-available" 
                    : booking.status === "upcoming" 
                      ? "bg-primary-blue" 
                      : "bg-gray-400"
                }`} />
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{booking.parkingName}</h3>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{booking.address}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{booking.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-medium">{booking.price}</span>
                    {booking.status === "active" && (
                      <Button size="sm" variant="outline">Prolonger</Button>
                    )}
                    {booking.status === "upcoming" && (
                      <Button size="sm" variant="outline" className="text-destructive-foreground hover:text-destructive-foreground">Annuler</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-gray-500 mb-4">Vous n'avez pas encore de réservation</p>
            <Button onClick={() => window.location.href = "/search"}>
              Trouver un parking
            </Button>
          </div>
        )}
      </main>
      
      <Navbar />
    </div>
  );
};

export default Bookings;
