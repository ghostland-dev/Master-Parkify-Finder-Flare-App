
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, ChevronDown, HelpCircle, MessageSquare, 
  Phone, Mail, ExternalLink, Search, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const faqCategories = [
  {
    category: "Réservation",
    items: [
      {
        question: "Comment réserver une place de parking ?",
        answer: "Pour réserver une place de parking, recherchez d'abord votre destination. Sélectionnez ensuite un parking disponible, choisissez la date et l'heure d'arrivée, puis confirmez la réservation après avoir vérifié les détails et le paiement."
      },
      {
        question: "Puis-je annuler ma réservation ?",
        answer: "Oui, vous pouvez annuler votre réservation jusqu'à 2 heures avant l'heure prévue d'arrivée. Pour ce faire, rendez-vous dans la section 'Réservations' de l'application, sélectionnez la réservation concernée et cliquez sur 'Annuler'. Un remboursement sera effectué selon nos conditions générales."
      },
      {
        question: "Comment modifier une réservation existante ?",
        answer: "Vous pouvez modifier votre réservation en accédant à la section 'Réservations', en sélectionnant la réservation concernée, puis en cliquant sur 'Modifier'. Vous pourrez alors changer la date, l'heure ou la durée, sous réserve de disponibilité."
      }
    ]
  },
  {
    category: "Paiement",
    items: [
      {
        question: "Quelles méthodes de paiement sont acceptées ?",
        answer: "Nous acceptons les cartes de crédit et de débit (Visa, MasterCard, American Express), ainsi que PayPal et Apple Pay. Vous pouvez ajouter ou gérer vos méthodes de paiement dans la section 'Profil > Méthodes de paiement'."
      },
      {
        question: "Comment obtenir une facture ?",
        answer: "Les factures sont automatiquement générées après chaque stationnement. Vous pouvez les consulter et les télécharger depuis la section 'Historique' de l'application, en sélectionnant la réservation pour laquelle vous souhaitez une facture."
      }
    ]
  },
  {
    category: "Stationnement",
    items: [
      {
        question: "Comment savoir si un parking dispose de bornes de recharge électrique ?",
        answer: "Les parkings équipés de bornes de recharge électrique sont identifiés par une icône spécifique dans la liste des résultats de recherche. Vous pouvez également filtrer votre recherche pour n'afficher que les parkings avec bornes de recharge."
      },
      {
        question: "Que faire si le parking est complet à mon arrivée malgré ma réservation ?",
        answer: "Si le parking est complet malgré votre réservation, contactez immédiatement notre service client via l'application. Un agent vous assistera pour trouver une solution alternative et, si nécessaire, organisera un remboursement."
      }
    ]
  },
  {
    category: "Compte",
    items: [
      {
        question: "Comment modifier mes informations personnelles ?",
        answer: "Pour modifier vos informations personnelles, accédez à votre profil en cliquant sur l'icône 'Profil' en bas de l'écran, puis sur 'Informations personnelles'. Vous pourrez alors modifier vos coordonnées et enregistrer les changements."
      },
      {
        question: "Comment ajouter un véhicule à mon compte ?",
        answer: "Pour ajouter un véhicule, allez dans votre profil, puis dans 'Mes véhicules', et cliquez sur '+ Ajouter un véhicule'. Remplissez les informations demandées (marque, modèle, immatriculation) et enregistrez."
      }
    ]
  }
];

const Support = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState<{category: string, items: FAQItem[]}[]>(faqCategories);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredFaqs(faqCategories);
      return;
    }
    
    const filtered = faqCategories.map(category => {
      const filteredItems = category.items.filter(
        item => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query)
      );
      
      return {
        category: category.category,
        items: filteredItems
      };
    }).filter(category => category.items.length > 0);
    
    setFilteredFaqs(filtered);
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
          <h1 className="text-lg font-semibold">Aide et support</h1>
        </div>
      </div>
      
      <main className="flex-1 pt-16 pb-20 px-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9"
          />
        </div>
        
        <div className="space-y-6">
          <Card className="bg-primary-blue/10 border-primary-blue">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Besoin d'aide ?</h3>
              <p className="text-sm mb-4">Notre équipe de support est disponible 7j/7 pour vous aider.</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center gap-2 justify-center">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 justify-center">
                  <Phone className="h-4 w-4" />
                  <span>Appeler</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-lg font-semibold mb-3">Questions fréquentes</h2>
          
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, index) => (
              category.items.length > 0 && (
                <div key={index} className="mb-6">
                  <h3 className="font-medium text-gray-500 text-sm mb-2">{category.category}</h3>
                  <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
                    {category.items.map((item, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`} className="border-b last:border-0">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <span className="text-left font-normal">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <p className="text-gray-600">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Aucun résultat pour "{searchQuery}"</p>
              <Button 
                variant="link" 
                onClick={() => setSearchQuery("")}
              >
                Réinitialiser la recherche
              </Button>
            </div>
          )}
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Contacter le support</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <span>support@parkify.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <span>01 23 45 67 89</span>
                </div>
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <span className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Centre d'aide en ligne
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Navbar />
    </div>
  );
};

export default Support;
