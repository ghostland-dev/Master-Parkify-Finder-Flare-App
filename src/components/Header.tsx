
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary-blue" />
        <h1 className="text-lg font-semibold text-primary-blue">Parkify</h1>
      </div>
      <div className="flex gap-2 mt-2">
        <Input
          placeholder="Rechercher un parking..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button size="sm" onClick={handleSearch}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
