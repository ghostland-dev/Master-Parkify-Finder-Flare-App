
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useParking } from "@/context/ParkingContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, CreditCard, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const BookParking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getParkingById } = useParking();
  const { toast } = useToast();
  const parking = getParkingById(id || "");

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>("12:00");
  const [duration, setDuration] = useState<string>("1");
  const [vehicle, setVehicle] = useState<string>("Mon véhicule principal");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

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

  const calculatePrice = () => {
    const pricePerHour = parseFloat(parking.price.replace('€/h', '').replace(',', '.'));
    const durationHours = parseFloat(duration);
    return (pricePerHour * durationHours).toFixed(2).replace('.', ',') + '€';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Réservation confirmée !",
      description: `Votre place au ${parking.name} est réservée pour le ${date} à ${startTime}.`,
    });
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-16 bg-primary-blue/90 flex items-center px-4">
        <button 
          className="absolute left-4 bg-white rounded-full p-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-white text-center w-full">Réserver une place</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Détails du parking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="font-semibold text-lg">{parking.name}</div>
            <div className="text-sm text-gray-500">{parking.address}</div>
            <div className="text-sm flex justify-between mt-2">
              <span>Prix horaire :</span>
              <span className="font-medium">{parking.price}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date et heure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  id="date" 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Heure d'arrivée</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  id="time" 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Durée</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Choisir une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 heure</SelectItem>
                  <SelectItem value="2">2 heures</SelectItem>
                  <SelectItem value="3">3 heures</SelectItem>
                  <SelectItem value="4">4 heures</SelectItem>
                  <SelectItem value="5">5 heures</SelectItem>
                  <SelectItem value="12">Demi-journée (12h)</SelectItem>
                  <SelectItem value="24">Journée complète (24h)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Véhicule</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={vehicle} onValueChange={setVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un véhicule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mon véhicule principal">Peugeot 308 - AA-123-BB</SelectItem>
                <SelectItem value="Mon autre véhicule">Renault Clio - CC-456-DD</SelectItem>
                <SelectItem value="add_new">+ Ajouter un véhicule</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Méthode de paiement</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`flex items-center gap-2 border rounded-md p-3 ${
                    paymentMethod === "card" ? "border-primary-blue bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <span>Carte bancaire</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-2 border rounded-md p-3 ${
                    paymentMethod === "paypal" ? "border-primary-blue bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <span className="font-semibold text-blue-600">Pay</span>
                  <span className="font-semibold text-blue-800">Pal</span>
                </button>
              </div>
            </div>
            
            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
              <span>Total à payer :</span>
              <span>{calculatePrice()}</span>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">Confirmer la réservation</Button>
      </form>
    </div>
  );
};

export default BookParking;
