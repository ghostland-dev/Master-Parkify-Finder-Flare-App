
import { Link, useLocation } from "react-router-dom";
import { MapPin, User, Search, Clock, History } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary-blue" : "text-gray-500";
  };

  const getIcon = (path: string, active: boolean) => {
    const iconClass = `${isMobile ? 'w-5 h-5' : 'w-5 h-5'}`;
    switch (path) {
      case "/":
        return <MapPin className={iconClass} />;
      case "/search":
        return <Search className={iconClass} />;
      case "/bookings":
        return <Clock className={iconClass} />;
      case "/history":
        return <History className={iconClass} />;
      case "/profile":
        return <User className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around items-center p-3 max-w-screen-lg mx-auto">
        {[
          { path: "/", label: "Carte" },
          { path: "/search", label: "Recherche" },
          { path: "/bookings", label: "Réservations" },
          { path: "/history", label: "Historique" },
          { path: "/profile", label: "Profil" }
        ].map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex flex-col items-center ${isActive(item.path)} transition-colors duration-200`}
            >
              <div className={`flex items-center justify-center ${active ? 'bg-blue-50 text-primary-blue' : ''} p-2 rounded-full transition-colors`}>
                {getIcon(item.path, active)}
              </div>
              <span className={`text-xs mt-1 ${active ? 'font-medium' : ''} ${isMobile ? '' : 'hidden sm:inline'}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
