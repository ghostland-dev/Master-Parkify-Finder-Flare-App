
import { Link, useLocation } from "react-router-dom";
import { MapPin, User, Search, Clock } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary-blue" : "text-gray-500";
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around items-center p-3">
        <Link to="/" className={`flex flex-col items-center ${isActive("/")}`}>
          <MapPin className="w-6 h-6" />
          <span className="text-xs mt-1">Carte</span>
        </Link>
        <Link to="/search" className={`flex flex-col items-center ${isActive("/search")}`}>
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">Recherche</span>
        </Link>
        <Link to="/bookings" className={`flex flex-col items-center ${isActive("/bookings")}`}>
          <Clock className="w-6 h-6" />
          <span className="text-xs mt-1">Réservations</span>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center ${isActive("/profile")}`}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
