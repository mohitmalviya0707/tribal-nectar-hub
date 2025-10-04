import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileCheck, 
  AlertTriangle, 
  MapPin, 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  Upload,
  Brain,
  Download,
  FileText
} from "lucide-react";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const stats = [
  {
    title: "Pending Applications",
    value: "247",
    change: "+12%",
    icon: <Clock className="w-6 h-6" />,
    color: "text-yellow-600"
  },
  {
    title: "Approved This Month",
    value: "89",
    change: "+23%",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "text-green-600"
  },
  {
    title: "Rejected Applications",
    value: "15",
    change: "-8%",
    icon: <XCircle className="w-6 h-6" />,
    color: "text-red-600"
  },
  {
    title: "Land Marked",
    value: "156",
    change: "+15%",
    icon: <MapPin className="w-6 h-6" />,
    color: "text-blue-600"
  }
];

const pendingApplications = [
  {
    id: "APP001",
    applicant: "Raj Kumar Meena",
    scheme: "Forest Rights Act 2006",
    state: "Rajasthan",
    district: "Udaipur",
    village: "Kotra",
    submittedDate: "2024-01-20",
    priority: "High",
    landArea: "2.5 acres"
  },
  {
    id: "APP002", 
    applicant: "Sunita Bhil",
    scheme: "PM Kisan",
    state: "Gujarat",
    district: "Banswara",
    village: "Garhi",
    submittedDate: "2024-01-18",
    priority: "Medium",
    landArea: "1.2 acres"
  },
  {
    id: "APP003",
    applicant: "Arjun Gond",
    scheme: "Jal Jivan Mission",
    state: "Madhya Pradesh", 
    district: "Dindori",
    village: "Samnapur",
    submittedDate: "2024-01-15",
    priority: "High",
    landArea: "N/A"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800';
    case 'Medium': return 'bg-yellow-100 text-yellow-800';
    case 'Low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

import Header from "./Header";
import InteractiveMap from "./InteractiveMap";
import DocumentUpload from "./DocumentUpload";
import AIDecisionSupport from "./AIDecisionSupport";
import EnhancedMap from "./EnhancedMap";
import ExportReports from "./ExportReports";
import { useLanguage } from "@/contexts/LanguageContext";

interface OfficerDashboardProps {
  onBack: () => void;
}

const OfficerDashboard = ({ onBack }: OfficerDashboardProps) => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState('applications');

  const menuItems = [
    { id: 'applications', label: t('applications'), icon: FileCheck },
    { id: 'documents', label: t('documentUpload'), icon: Upload },
    { id: 'analytics', label: t('analytics'), icon: BarChart3 },
    { id: 'map', label: t('landRecords'), icon: MapPin },
    { id: 'support', label: t('aiSupport'), icon: Brain },
    { id: 'export', label: t('exportReports'), icon: Download }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar className="border-r">
            <SidebarContent>
              <div className="p-4">
                <Button 
                  variant="outline" 
                  onClick={onBack}
                  className="w-full"
                >
                  {t('backButton')}
                </Button>
              </div>
              
              <SidebarGroup>
                <SidebarGroupLabel>{t('officerDashboard')}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveView(item.id)}
                          isActive={activeView === item.id}
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{t('officerDashboard')}</h2>
                  <p className="text-muted-foreground">{t('welcomeBack')}</p>
                </div>
                <SidebarTrigger />
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                          {stat.icon}
                        </div>
                        <span className="text-xs text-green-600 font-medium">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.title}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Content Area */}
              {activeView === 'applications' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileCheck className="w-5 h-5 mr-2" />
                      {t('pendingApplications')}
                    </CardTitle>
                    <CardDescription>
                      {t('reviewAndProcess')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingApplications.map((app) => (
                        <div key={app.id} className="border border-border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3">
                                <h4 className="font-semibold">{app.applicant}</h4>
                                <Badge className={getPriorityColor(app.priority)}>
                                  {app.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                <strong>{t('scheme')}:</strong> {app.scheme}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>{t('location')}:</strong> {app.village}, {app.district}, {app.state}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>{t('landArea')}:</strong> {app.landArea}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                <strong>{t('submitted')}:</strong> {app.submittedDate}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                {t('review')}
                              </Button>
                              <Button size="sm" variant="default">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                {t('approve')}
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="w-4 h-4 mr-1" />
                                {t('reject')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeView === 'documents' && (
                <DocumentUpload />
              )}

              {activeView === 'analytics' && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('analyticsReports')}</CardTitle>
                    <CardDescription>
                      {t('comprehensiveAnalysis')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">{t('statusDistribution')}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{t('approved')}</span>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full w-[65%]"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{t('pendingApplications')}</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-yellow-600 h-2 rounded-full w-[25%]"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{t('rejected')}</span>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full w-[10%]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">{t('stateWiseApplications')}</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm">{t('madhyaPradesh')}</span>
                            <Badge variant="secondary">142</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">{t('rajasthan')}</span>
                            <Badge variant="secondary">98</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">{t('gujarat')}</span>
                            <Badge variant="secondary">76</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">{t('odisha')}</span>
                            <Badge variant="secondary">54</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeView === 'map' && (
                <EnhancedMap />
              )}

              {activeView === 'support' && (
                <AIDecisionSupport />
              )}

              {activeView === 'export' && (
                <ExportReports />
              )}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default OfficerDashboard;