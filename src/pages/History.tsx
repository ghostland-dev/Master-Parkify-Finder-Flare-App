
import React, { useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Receipt, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HistoryItem {
  id: string;
  parkingName: string;
  address: string;
  date: string;
  startTime: string;
  endTime: string;
  price: string;
  invoiceAvailable: boolean;
}

const mockHistory: HistoryItem[] = [
  {
    id: "h1",
    parkingName: "Parking Centre-Ville",
    address: "15 Rue de la République",
    date: "20/07/2023",
    startTime: "14:30",
    endTime: "16:30",
    price: "5,00€",
    invoiceAvailable: true,
  },
  {
    id: "h2",
    parkingName: "Parking de la Gare",
    address: "Place de la Gare",
    date: "15/07/2023",
    startTime: "09:00",
    endTime: "11:00",
    price: "6,00€",
    invoiceAvailable: true,
  },
  {
    id: "h3",
    parkingName: "Parking Souterrain Marché",
    address: "8 Place du Marché",
    date: "05/07/2023",
    startTime: "11:00",
    endTime: "13:30",
    price: "5,00€",
    invoiceAvailable: false,
  },
  {
    id: "h4",
    parkingName: "Parking Opéra",
    address: "3 Avenue de l'Opéra",
    date: "28/06/2023",
    startTime: "19:00",
    endTime: "22:00",
    price: "12,00€",
    invoiceAvailable: true,
  },
  {
    id: "h5",
    parkingName: "Parking du Parc",
    address: "Allée des Tilleuls",
    date: "20/06/2023",
    startTime: "14:00",
    endTime: "15:30",
    price: "2,25€",
    invoiceAvailable: true,
  },
];

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHistory, setFilteredHistory] = useState(mockHistory);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = mockHistory.filter(
      (item) =>
        item.parkingName.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) ||
        item.date.includes(query)
    );
    
    setFilteredHistory(filtered);
  };

  const getMonthlyTotal = () => {
    // Calcul simplifié pour la démonstration
    const total = mockHistory
      .slice(0, 3) // Supposons que ce sont les stationnements du mois courant
      .reduce((acc, item) => {
        const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
        return acc + price;
      }, 0);
    
    return total.toFixed(2).replace('.', ',') + '€';
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Historique</h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total du mois</p>
            <p className="font-semibold">{getMonthlyTotal()}</p>
          </div>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher dans l'historique..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9"
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all" className="flex-1">Tous</TabsTrigger>
            <TabsTrigger value="receipts" className="flex-1">Factures</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.parkingName}</h3>
                      <span className="font-medium">{item.price}</span>
                    </div>
                    
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{item.address}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{item.startTime} - {item.endTime}</span>
                      </div>
                    </div>
                    
                    {item.invoiceAvailable && (
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                          <Receipt className="h-4 w-4" />
                          <span>Télécharger la facture</span>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">Aucun résultat pour "{searchQuery}"</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="receipts" className="space-y-4">
            {filteredHistory
              .filter((item) => item.invoiceAvailable)
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.parkingName}</h3>
                      <span className="font-medium">{item.price}</span>
                    </div>
                    
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{item.startTime} - {item.endTime}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                        <Receipt className="h-4 w-4" />
                        <span>Télécharger la facture</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
      
      <Navbar />
    </div>
  );
};

export default History;
