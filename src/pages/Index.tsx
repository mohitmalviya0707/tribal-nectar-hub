import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Zap, CheckCircle2, Users, TrendingUp, Target, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ChatBot from "@/components/ChatBot";
import CitizenPortal from "@/components/CitizenPortal";
import OfficerDashboard from "@/components/OfficerDashboard";
import OfficerLogin from "@/components/OfficerLogin";

const Index = () => {
  const [userType, setUserType] = useState<'citizen' | 'officer' | 'officer-login' | null>(null);
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      titleKey: "landRights",
      descKey: "landRightsDesc",
      icon: <MapPin className="w-6 h-6" />,
      color: "border-l-orange-500",
      badgeKey: "forestRightsAct",
      badgeColor: "bg-green-600"
    },
    {
      id: 2,
      titleKey: "pmKisan",
      descKey: "pmKisanDesc",
      icon: <Zap className="w-6 h-6" />,
      color: "border-l-green-500",
      badgeKey: "perYear",
      badgeColor: "bg-green-600"
    },
    {
      id: 3,
      titleKey: "jalJivan",
      descKey: "jalJeevanDesc",
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "border-l-blue-500",
      badgeKey: "waterConnection",
      badgeColor: "bg-green-600"
    }
  ];

  const stats = [
    { value: "15.2L+", labelKey: "applicationsProcessed", color: "text-orange-600" },
    { value: "8.5L+", labelKey: "landPattasApproved", color: "text-green-600" },
    { value: "25.8L+", labelKey: "beneficiariesEnrolled", color: "text-blue-600" },
    { value: "99.2%", labelKey: "digitalAccuracy", color: "text-orange-600" }
  ];

  if (userType === 'citizen') {
    return <CitizenPortal onBack={() => setUserType(null)} />;
  }

  if (userType === 'officer-login') {
    return <OfficerLogin onBack={() => setUserType(null)} onLogin={() => setUserType('officer')} />;
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
                  {t('govInitiative')}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('tribalAffairs')}
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-yellow-200">
                {t('digitalPortal')}
              </h2>
              
              <p className="text-lg md:text-xl mb-8 text-white/90 max-w-3xl">
                {t('heroDescription')}
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
                  onClick={() => setUserType('officer-login')}
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
          <h2 className="text-3xl font-bold mb-4">{t('availableServices')}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('servicesDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className={`border-l-4 ${service.color} hover:shadow-lg transition-all cursor-pointer`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {service.icon}
                    <h3 className="font-semibold text-lg">{t(service.titleKey as any)}</h3>
                  </div>
                  <span className={`px-3 py-1 text-xs text-white rounded-full ${service.badgeColor}`}>
                    {t(service.badgeKey as any)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{t(service.descKey as any)}</p>
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
                {t(stat.labelKey as any)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">{t('quickLinks')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">PM Kisan Yojana</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">Jal Jeevan Mission</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">{t('landRecords')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('support')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">{t('helpCenter')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">{t('contactUs')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">{t('faqs')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t('government')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">{t('ministryTribal')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">{t('digitalIndia')}</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm">{t('myGov')}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default Index;
