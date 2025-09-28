import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, MapPin, DollarSign, GraduationCap, Users, Droplets } from "lucide-react";

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

const CitizenPortal = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="gov-gradient-hero text-white rounded-lg p-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">
            Empowering Tribal Communities
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Access government schemes, apply for benefits, and track your applications. 
            Your gateway to tribal welfare and forest rights.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="lg">
              <MapPin className="w-5 h-5 mr-2" />
              Check Land Status
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              Track Applications
            </Button>
          </div>
        </div>
      </div>

      {/* Available Schemes */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Available Government Schemes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="gov-card hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${scheme.color} flex items-center justify-center`}>
                    {scheme.icon}
                  </div>
                  <Badge variant="secondary">{scheme.status}</Badge>
                </div>
                <CardTitle className="text-lg">{scheme.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {scheme.description}
                </CardDescription>
                <Button className="w-full">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Applications */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Your Recent Applications</h3>
        <Card className="gov-card">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>
              Track the progress of your submitted applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{app.scheme}</p>
                    <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                    <p className="text-sm text-muted-foreground">Submitted: {app.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      <Button variant="link" className="p-0 h-auto text-primary">
                        View Details
                      </Button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenPortal;