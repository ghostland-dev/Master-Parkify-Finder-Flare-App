
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, Moon, Bell, Smartphone, Globe, Shield, 
  Languages, CreditCard, Languages as TranslateIcon
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("fr");
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 px-4 py-3">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Paramètres</h1>
        </div>
      </div>
      
      <main className="flex-1 pt-16 pb-20 px-4">
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Profil</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-primary-blue">
                <AvatarFallback className="bg-primary-blue text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div className="ml-4 flex-1">
                <h2 className="font-semibold">Jean Dupont</h2>
                <p className="text-sm text-gray-500">jean.dupont@example.com</p>
                <Button variant="link" className="p-0 h-auto text-primary-blue mt-1">
                  Modifier le profil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Apparence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-gray-500" />
                <Label htmlFor="dark-mode">Mode sombre</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TranslateIcon className="h-5 w-5 text-gray-500" />
                <Label htmlFor="language">Langue</Label>
              </div>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="w-32">
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <Label htmlFor="notifications">Notifications push</Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <Label htmlFor="sms-notifications">Notifications SMS</Label>
              </div>
              <Switch
                id="sms-notifications"
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Paiement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p>MasterCard •••• 4242</p>
                  <p className="text-xs text-gray-500">Expire 12/24</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Modifier
              </Button>
            </div>
            
            <Button variant="outline" className="w-full">
              + Ajouter une carte
            </Button>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Confidentialité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-500" />
                <Label htmlFor="location-privacy">Partager ma position</Label>
              </div>
              <Switch
                id="location-privacy"
                checked={true}
                onCheckedChange={() => {}}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-gray-500" />
                <Label htmlFor="data-collection">Collecte de données</Label>
              </div>
              <Switch
                id="data-collection"
                checked={true}
                onCheckedChange={() => {}}
              />
            </div>
            
            <Separator className="my-2" />
            
            <Button variant="link" className="px-0 h-auto text-primary-blue">
              Politique de confidentialité
            </Button>
            <Button variant="link" className="px-0 h-auto text-primary-blue">
              Conditions d'utilisation
            </Button>
          </CardContent>
        </Card>
        
        <Button 
          variant="destructive" 
          className="w-full mb-6"
        >
          Déconnexion
        </Button>
        
        <div className="text-center text-xs text-gray-400 mb-6">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2023 Parkify. Tous droits réservés.</p>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Settings;
