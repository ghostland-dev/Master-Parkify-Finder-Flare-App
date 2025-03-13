
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Plus, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Vehicle {
  id: string;
  name: string;
  plate: string;
  brand: string;
  model: string;
  color: string;
  isDefault: boolean;
}

const Vehicles = () => {
  const navigate = useNavigate();
  
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "v1",
      name: "Voiture personnelle",
      plate: "AA-123-BB",
      brand: "Peugeot",
      model: "308",
      color: "Gris",
      isDefault: true
    },
    {
      id: "v2",
      name: "Voiture familiale",
      plate: "CC-456-DD",
      brand: "Renault",
      model: "Clio",
      color: "Bleu",
      isDefault: false
    }
  ]);
  
  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, 'id'>>({
    name: "",
    plate: "",
    brand: "",
    model: "",
    color: "",
    isDefault: false
  });
  
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  
  const handleAddVehicle = () => {
    const newId = `v${vehicles.length + 1}`;
    setVehicles([...vehicles, { ...newVehicle, id: newId }]);
    setNewVehicle({
      name: "",
      plate: "",
      brand: "",
      model: "",
      color: "",
      isDefault: false
    });
    setIsAddDialogOpen(false);
  };
  
  const handleEditVehicle = () => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id ? editingVehicle : v
      ));
      setIsEditDialogOpen(false);
    }
  };
  
  const handleDeleteVehicle = () => {
    if (vehicleToDelete) {
      setVehicles(vehicles.filter(v => v.id !== vehicleToDelete.id));
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleSetDefault = (id: string) => {
    setVehicles(vehicles.map(vehicle => ({
      ...vehicle,
      isDefault: vehicle.id === id
    })));
  };

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
          <h1 className="text-lg font-semibold">Mes véhicules</h1>
        </div>
      </div>
      
      <main className="flex-1 pt-16 pb-20 px-4">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500">Gérez vos véhicules pour faciliter vos réservations</p>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Ajouter</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un véhicule</DialogTitle>
                <DialogDescription>
                  Entrez les informations de votre véhicule ci-dessous.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nom du véhicule</Label>
                  <Input 
                    id="name" 
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                    placeholder="ex: Voiture personnelle"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="plate">Plaque d'immatriculation</Label>
                  <Input 
                    id="plate" 
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value})}
                    placeholder="ex: AA-123-BB"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Marque</Label>
                    <Input 
                      id="brand" 
                      value={newVehicle.brand}
                      onChange={(e) => setNewVehicle({...newVehicle, brand: e.target.value})}
                      placeholder="ex: Peugeot"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="model">Modèle</Label>
                    <Input 
                      id="model" 
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                      placeholder="ex: 308"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="color">Couleur</Label>
                  <Input 
                    id="color" 
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})}
                    placeholder="ex: Gris"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="default-vehicle"
                    checked={newVehicle.isDefault}
                    onCheckedChange={(checked) => setNewVehicle({...newVehicle, isDefault: checked})}
                  />
                  <Label htmlFor="default-vehicle">Définir comme véhicule par défaut</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                <Button onClick={handleAddVehicle}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {vehicles.length > 0 ? (
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className={`overflow-hidden ${vehicle.isDefault ? 'border-primary-blue' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{vehicle.name}</h3>
                        {vehicle.isDefault && (
                          <Badge variant="outline" className="text-xs border-primary-blue text-primary-blue">
                            Par défaut
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-500 w-24">Immatriculation</span>
                          <span>{vehicle.plate}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-gray-500 w-20">Marque</span>
                          <span>{vehicle.brand}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-gray-500 w-24">Modèle</span>
                          <span>{vehicle.model}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="text-gray-500 w-20">Couleur</span>
                          <span>{vehicle.color}</span>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => {
                            setEditingVehicle(vehicle);
                            setIsEditDialogOpen(true);
                          }}
                          className="flex items-center gap-2"
                        >
                          <Pencil className="h-4 w-4" />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        
                        {!vehicle.isDefault && (
                          <DropdownMenuItem 
                            onClick={() => handleSetDefault(vehicle.id)}
                            className="flex items-center gap-2"
                          >
                            <Car className="h-4 w-4" />
                            <span>Définir par défaut</span>
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem 
                          onClick={() => {
                            setVehicleToDelete(vehicle);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="flex items-center gap-2 text-red-500 focus:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Vous n'avez pas encore de véhicule enregistré</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Ajouter un véhicule
            </Button>
          </div>
        )}
        
        {/* Dialog pour modifier un véhicule */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier un véhicule</DialogTitle>
              <DialogDescription>
                Modifiez les informations de votre véhicule.
              </DialogDescription>
            </DialogHeader>
            
            {editingVehicle && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nom du véhicule</Label>
                  <Input 
                    id="edit-name" 
                    value={editingVehicle.name}
                    onChange={(e) => setEditingVehicle({...editingVehicle, name: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-plate">Plaque d'immatriculation</Label>
                  <Input 
                    id="edit-plate" 
                    value={editingVehicle.plate}
                    onChange={(e) => setEditingVehicle({...editingVehicle, plate: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-brand">Marque</Label>
                    <Input 
                      id="edit-brand" 
                      value={editingVehicle.brand}
                      onChange={(e) => setEditingVehicle({...editingVehicle, brand: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-model">Modèle</Label>
                    <Input 
                      id="edit-model" 
                      value={editingVehicle.model}
                      onChange={(e) => setEditingVehicle({...editingVehicle, model: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-color">Couleur</Label>
                  <Input 
                    id="edit-color" 
                    value={editingVehicle.color}
                    onChange={(e) => setEditingVehicle({...editingVehicle, color: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="edit-default-vehicle"
                    checked={editingVehicle.isDefault}
                    onCheckedChange={(checked) => setEditingVehicle({...editingVehicle, isDefault: checked})}
                  />
                  <Label htmlFor="edit-default-vehicle">Définir comme véhicule par défaut</Label>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleEditVehicle}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Dialog pour supprimer un véhicule */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer le véhicule</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Annuler</Button>
              <Button variant="destructive" onClick={handleDeleteVehicle}>Supprimer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Vehicles;
