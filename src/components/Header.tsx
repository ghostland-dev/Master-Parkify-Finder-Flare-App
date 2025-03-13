
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 px-4 py-3">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary-blue" />
          <h1 className="text-lg font-semibold text-primary-blue">Parkify</h1>
        </div>
        <div className={`flex gap-2 mt-2 ${isMobile ? 'flex-col sm:flex-row' : ''}`}>
          <Input
            placeholder="Rechercher un parking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button size={isMobile ? "default" : "sm"} onClick={handleSearch} className={isMobile ? "w-full sm:w-auto" : ""}>
            <Search className="w-4 h-4 mr-2" />
            {isMobile && <span>Rechercher</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
