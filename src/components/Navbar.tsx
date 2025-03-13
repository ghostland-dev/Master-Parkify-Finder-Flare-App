
import { Link, useLocation } from "react-router-dom";
import { MapPin, User, Search, Clock } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary-blue" : "text-gray-500";
  };

  const getIcon = (path: string, active: boolean) => {
    const iconClass = "w-5 h-5";
    switch (path) {
      case "/":
        return <MapPin className={iconClass} />;
      case "/search":
        return <Search className={iconClass} />;
      case "/bookings":
        return <Clock className={iconClass} />;
      case "/profile":
        return <User className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around items-center p-3">
        {[
          { path: "/", label: "Carte" },
          { path: "/search", label: "Recherche" },
          { path: "/bookings", label: "Réservations" },
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
              <span className={`text-xs mt-1 ${active ? 'font-medium' : ''}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
