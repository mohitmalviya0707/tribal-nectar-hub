import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, DollarSign, GraduationCap, Users, Droplets, Plus, Search } from "lucide-react";
import Header from "./Header";
import CitizenLogin from "./CitizenLogin";
import ApplicationForm from "./ApplicationForm";
import ApplicationTracking from "./ApplicationTracking";

const schemes = [
  {
    id: 'fra-2006',
    title: 'Forest Rights Act 2006',
    description: 'Apply for recognition of forest rights and land titles',
    icon: <FileText className="w-6 h-6" />,
    color: 'bg-green-100 text-green-800',
    status: 'Available'
  },
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi',
    description: 'Financial support to small and marginal farmers',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-800',
    status: 'Available'
  },
  {
    id: 'jal-jivan',
    title: 'Jal Jivan Mission',
    description: 'Clean drinking water to every rural household',
    icon: <Droplets className="w-6 h-6" />,
    color: 'bg-cyan-100 text-cyan-800',
    status: 'Available'
  },
  {
    id: 'scholarships',
    title: 'Tribal Scholarships',
    description: 'Educational scholarships for tribal students',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-800',
    status: 'Available'
  },
  {
    id: 'tribal-loan',
    title: 'Tribal Development Loan',
    description: 'Low-interest loans for tribal entrepreneurs',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-800',
    status: 'Available'
  }
];

const recentApplications = [
  { id: '001', scheme: 'Forest Rights Act 2006', status: 'Under Review', date: '2024-01-15' },
  { id: '002', scheme: 'PM Kisan', status: 'Approved', date: '2024-01-10' },
  { id: '003', scheme: 'Jal Jivan Mission', status: 'Pending Documents', date: '2024-01-08' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved': return 'status-approved';
    case 'Rejected': return 'status-rejected';
    default: return 'status-pending';
  }
};

interface CitizenPortalProps {
  onBack: () => void;
}

const CitizenPortal = ({ onBack }: CitizenPortalProps) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'login' | 'application' | 'tracking'>('dashboard');
  const [newApplicationId, setNewApplicationId] = useState<string | null>(null);
  const handleLoginComplete = () => {
    setCurrentView('application');
  };

  const handleApplicationComplete = (applicationId: string) => {
    setNewApplicationId(applicationId);
    setCurrentView('tracking');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setNewApplicationId(null);
  };

  if (currentView === 'login') {
    return (
      <CitizenLogin 
        onBack={handleBackToDashboard}
        onLogin={handleLoginComplete}
      />
    );
  }

  if (currentView === 'application') {
    return (
      <ApplicationForm 
        onBack={handleBackToDashboard}
        onComplete={handleApplicationComplete}
      />
    );
  }

  if (currentView === 'tracking') {
    return (
      <ApplicationTracking 
        onBack={handleBackToDashboard}
        applicationId={newApplicationId || undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6"
        >
          ← वापस जाएं
        </Button>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">नागरिक सेवाएं</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
                  onClick={() => setCurrentView('login')}>
              <CardContent className="p-6 text-center">
                <Plus className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">नया आवेदन</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  नई योजना के लिए आवेदन करें
                </p>
                <Button className="w-full">आवेदन शुरू करें</Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => setCurrentView('tracking')}>
              <CardContent className="p-6 text-center">
                <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">आवेदन की स्थिति</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  अपने आवेदन की स्थिति जांचें
                </p>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  स्थिति देखें
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">उपलब्ध योजनाएं</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {schemes.map((scheme) => (
              <Card key={scheme.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${scheme.color} flex items-center justify-center`}>
                        {scheme.icon}
                      </div>
                      <h3 className="font-semibold">{scheme.title}</h3>
                    </div>
                    <Badge variant="secondary">{scheme.status}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => setCurrentView('login')}
                  >
                    आवेदन करें
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPortal;