import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// const languages = [
//   { code: "hi", name: "Hindi", native: "हिंदी" },
//   { code: "en", name: "English", native: "English" },
//   { code: "mr", name: "Marathi", native: "मराठी" },
//   { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
//   { code: "bn", name: "Bengali", native: "বাংলা" },
//   { code: "te", name: "Telugu", native: "తెలుగు" },
//   { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" }
// ];
const languages = [
  { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
  { code: 'od' as Language, name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'te' as Language, name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn' as Language, name: 'বাংলা', flag: '🇮🇳' },
  { code: 'ta' as Language, name: 'தமிழ்', flag: '🇮🇳' }, { code: 'ml' as Language, name: 'മലയാളം', flag: '🇮🇳' }, { code: 'kn' as Language, name: 'ಕನ್ನಡ', flag: '🇮🇳' }, { code: 'gu' as Language, name: 'ગુજરાતી', flag: '🇮🇳' }, { code: 'mr' as Language, name: 'मराठी', flag: '🇮🇳' }, { code: 'pa' as Language, name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' }, { code: 'as' as Language, name: 'অসমীয়া', flag: '🇮🇳' },
    
  ];

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{t('title')}</h1>
              <p className="text-sm text-gray-600">{t('subtitle')}</p>
            </div>
          </div>

          {/* Language Selector */}
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-28 border-0 bg-transparent">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
