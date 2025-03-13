
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, Settings, CreditCard, History, 
  Car, HelpCircle, LogOut, ChevronRight 
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-1 pt-28 pb-20 px-4">
        <Card className="mb-6">
          <CardContent className="pt-6 px-4 flex items-center">
            <Avatar className="h-16 w-16 border-2 border-primary-blue">
              <AvatarFallback className="bg-primary-blue text-white text-xl">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div className="ml-4">
              <h2 className="font-semibold text-lg">Jean Dupont</h2>
              <p className="text-gray-500">jean.dupont@example.com</p>
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">
                  Premium
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Compte</CardTitle>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <div className="divide-y">
              <Button 
                variant="ghost" 
                className="w-full justify-start py-6 rounded-none"
                onClick={() => navigate("/settings")}
              >
                <User className="mr-3 h-5 w-5 text-gray-500" />
                <span className="flex-1 text-left">Information personnelle</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start py-6 rounded-none"
                onClick={() => navigate("/vehicles")}
              >
                <Car className="mr-3 h-5 w-5 text-gray-500" />
                <span className="flex-1 text-left">Mes véhicules</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              
              <Button variant="ghost" className="w-full justify-start py-6 rounded-none">
                <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                <span className="flex-1 text-left">Méthodes de paiement</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start py-6 rounded-none"
                onClick={() => navigate("/history")}
              >
                <History className="mr-3 h-5 w-5 text-gray-500" />
                <span className="flex-1 text-left">Historique</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Plus</CardTitle>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <div className="divide-y">
              <Button 
                variant="ghost" 
                className="w-full justify-start py-6 rounded-none"
                onClick={() => navigate("/settings")}
              >
                <Settings className="mr-3 h-5 w-5 text-gray-500" />
                <span className="flex-1 text-left">Paramètres</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start py-6 rounded-none"
                onClick={() => navigate("/support")}
              >
                <HelpCircle className="mr-3 h-5 w-5 text-gray-500" />
                <span className="flex-1 text-left">Aide et support</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
              
              <Button variant="ghost" className="w-full justify-start py-6 rounded-none text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-3 h-5 w-5" />
                <span className="flex-1 text-left">Déconnexion</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-gray-400 mt-6">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2023 Parkify. Tous droits réservés.</p>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Profile;
