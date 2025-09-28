import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" }
];

interface HeaderProps {
  userType: 'citizen' | 'officer' | null;
  onUserTypeChange: (type: 'citizen' | 'officer' | null) => void;
}

const Header = ({ userType, onUserTypeChange }: HeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Apply for Schemes", href: "#schemes" },
    { name: "Track Application", href: "#track" },
    { name: "Land Records", href: "#land" },
    { name: "Help", href: "#help" }
  ];

  const NavigationMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={`${mobile ? 'flex flex-col space-y-4' : 'hidden md:flex items-center space-x-8'}`}>
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="text-foreground hover:text-primary transition-colors font-medium"
        >
          {item.name}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="gov-gradient-hero w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MTA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Ministry of Tribal Affairs</h1>
              <p className="text-sm text-muted-foreground">Government of India</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu />

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.native}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* User Type Selector */}
            <div className="flex space-x-2">
              <Button
                variant={userType === 'citizen' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUserTypeChange(userType === 'citizen' ? null : 'citizen')}
              >
                <User className="w-4 h-4 mr-1" />
                Citizen
              </Button>
              <Button
                variant={userType === 'officer' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUserTypeChange(userType === 'officer' ? null : 'officer')}
              >
                <User className="w-4 h-4 mr-1" />
                Officer
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="mt-6">
                  <NavigationMenu mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;