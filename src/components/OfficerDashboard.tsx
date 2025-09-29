import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileCheck, 
  AlertTriangle, 
  MapPin, 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye
} from "lucide-react";

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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6"
        >
          {t('backButton')}
        </Button>
        
        <div className="space-y-8">
      {/* Officer Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Officer Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome back, manage tribal applications and land records
            </p>
          </div>
          <div className="flex space-x-3">
            <Button>
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              Open Map View
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="gov-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-sm text-green-600 font-medium">
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="applications">{t('applications')}</TabsTrigger>
          <TabsTrigger value="documents">{t('documentUpload')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('analytics')}</TabsTrigger>
          <TabsTrigger value="map">{t('landRecords')}</TabsTrigger>
          <TabsTrigger value="support">{t('aiSupport')}</TabsTrigger>
          <TabsTrigger value="export">{t('exportReports')}</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="w-5 h-5 mr-2" />
                {t('pendingApplications')}
              </CardTitle>
              <CardDescription>
                Review and process tribal benefit applications
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
                          <strong>Scheme:</strong> {app.scheme}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Location:</strong> {app.village}, {app.district}, {app.state}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Land Area:</strong> {app.landArea}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Submitted:</strong> {app.submittedDate}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" variant="default">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <DocumentUpload />
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="gov-card">
            <CardHeader>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>
                Comprehensive analysis of tribal applications and demographics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Application Status Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Approved</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[65%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full w-[25%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rejected</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full w-[10%]"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">State-wise Applications</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Madhya Pradesh</span>
                      <Badge variant="secondary">142</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Rajasthan</span>
                      <Badge variant="secondary">98</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Gujarat</span>
                      <Badge variant="secondary">76</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Odisha</span>
                      <Badge variant="secondary">54</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <EnhancedMap />
        </TabsContent>

        <TabsContent value="support">
          <AIDecisionSupport />
        </TabsContent>

        <TabsContent value="export">
          <ExportReports />
        </TabsContent>
      </Tabs>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;