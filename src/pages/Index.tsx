import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, CheckCircle2, Users, TrendingUp, Target, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ChatBot from "@/components/ChatBot";
import CitizenPortal from "@/components/CitizenPortal";
import OfficerDashboard from "@/components/OfficerDashboard";

const services = [
  {
    id: 1,
    title: "भूमि अधिकार",
    titleEn: "Land Rights",
    description: "भूमि पट्टा, स्वामित्व दस्तावेज और भूमि रिकॉर्ड सत्यापन के लिए आवेदन करें",
    icon: <MapPin className="w-6 h-6" />,
    color: "border-l-orange-500",
    badge: "Forest Rights Act",
    badgeColor: "bg-green-600"
  },
  {
    id: 2,
    title: "PM Kisan Yojana",
    titleEn: "PM Kisan Yojana", 
    description: "Direct benefit transfer for farmers with ₹6,000 annual support",
    icon: <Zap className="w-6 h-6" />,
    color: "border-l-green-500",
    badge: "₹6,000/year",
    badgeColor: "bg-green-600"
  },
  {
    id: 3,
    title: "Jal Jeevan Mission",
    titleEn: "Jal Jeevan Mission",
    description: "Clean drinking water connection for every tribal household", 
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "border-l-blue-500",
    badge: "Water Connection",
    badgeColor: "bg-green-600"
  }
];

const stats = [
  { value: "15.2L+", label: "Applications Processed", color: "text-orange-600" },
  { value: "8.5L+", label: "Land Pattas Approved", color: "text-green-600" },
  { value: "25.8L+", label: "Beneficiaries Enrolled", color: "text-blue-600" },
  { value: "99.2%", label: "Digital Accuracy", color: "text-orange-600" }
];

const footerLinks = {
  "त्वरित लिंक": ["PM Kisan Yojana", "Jal Jeevan Mission", "Land Records"],
  "सहायता": ["Help Center", "Contact Us", "FAQs"],
  "सरकार": ["Ministry of Tribal Affairs", "Digital India", "MyGov"]
};

const Index = () => {
  const [userType, setUserType] = useState<'citizen' | 'officer' | null>(null);
  const { t } = useLanguage();

  if (userType === 'citizen') {
    return <CitizenPortal onBack={() => setUserType(null)} />;
  }

  if (userType === 'officer') {
    return <OfficerDashboard onBack={() => setUserType(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-green-500">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="text-white">
              <div className="mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                  भारत सरकार की पहल
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                जनजातीय मामले
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-yellow-200">
                डिजिटल पोर्टल
              </h2>
              
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl">
                डिजिटल गवर्नेंस के माध्यम से जनजातीय समुदायों को सशक्त बनाना। भूमि अधिकार, सरकारी 
                लाभ के लिए आवेदन करें और अपने आवेदन को सहजता से ट्रैक करें।
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => setUserType('citizen')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  {t('citizen')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => setUserType('officer')}
                >
                  {t('officer')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">उपलब्ध सेवाएं</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            जनजातीय समुदायों के लिए विशेष रूप से डिजाइन की गई सरकारी योजनाओं और सेवाओं का उपयोग करें
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className={`border-l-4 ${service.color} hover:shadow-lg transition-all cursor-pointer`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {service.icon}
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                  </div>
                  <span className={`px-3 py-1 text-xs text-white rounded-full ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button className="w-full" onClick={() => setUserType('citizen')}>
                  {t('applyNow')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default Index;
