
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParkingProvider } from "./context/ParkingContext";
import Index from "./pages/Index";
import Search from "./pages/Search";
import ParkingDetail from "./pages/ParkingDetail";
import BookParking from "./pages/BookParking";
import Bookings from "./pages/Bookings";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Vehicles from "./pages/Vehicles";
import NotFound from "./pages/NotFound";
import { useIsMobile } from "./hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ParkingProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className={`min-h-screen ${isMobile ? 'mobile-container' : 'container'}`}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/parking/:id" element={<ParkingDetail />} />
                <Route path="/parking/:id/book" element={<BookParking />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ParkingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
