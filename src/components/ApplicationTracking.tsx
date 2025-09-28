import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, FileText, Clock, CheckCircle, XCircle, Download, MapPin } from "lucide-react";

interface ApplicationTrackingProps {
  onBack: () => void;
  applicationId?: string;
}

const ApplicationTracking = ({ onBack, applicationId: initialId }: ApplicationTrackingProps) => {
  const [searchId, setSearchId] = useState(initialId || '');
  const [applicationData, setApplicationData] = useState<any>(null);

  // Mock data for demonstration
  const mockApplications = {
    'FRA123456': {
      id: 'FRA123456',
      applicantName: 'राम कुमार',
      submissionDate: '2025-01-15',
      status: 'approved',
      schemes: ['Forest Rights Act 2006', 'PM Kisan Yojana'],
      stage: 'completed',
      officerRemarks: 'सभी दस्तावेज सत्यापित। भूमि अधिकार स्वीकृत।',
      landCoordinates: { lat: 23.2599, lng: 77.4126 }
    },
    'FRA789012': {
      id: 'FRA789012',
      applicantName: 'सीता देवी',
      submissionDate: '2025-01-20',
      status: 'pending',
      schemes: ['Jal Jeevan Mission'],
      stage: 'under_review',
      officerRemarks: 'दस्तावेज सत्यापन के लिए भेजा गया।',
      landCoordinates: null
    },
    'FRA345678': {
      id: 'FRA345678',
      applicantName: 'मोहन लाल',
      submissionDate: '2025-01-18',
      status: 'rejected',
      schemes: ['Tribal Loan Scheme'],
      stage: 'rejected',
      officerRemarks: 'आय प्रमाण पत्र में त्रुटि। पुनः आवेदन करें।',
      landCoordinates: null
    }
  };

  const handleSearch = () => {
    const app = mockApplications[searchId as keyof typeof mockApplications];
    setApplicationData(app || null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'स्वीकृत';
      case 'rejected': return 'अस्वीकृत';
      case 'pending': return 'लंबित';
      default: return 'अज्ञात';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          वापस जाएं
        </Button>

        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary text-center">
              आवेदन स्थिति की जांच करें
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="applicationId" className="sr-only">आवेदन आईडी</Label>
                <Input
                  id="applicationId"
                  placeholder="आवेदन आईडी दर्ज करें (जैसे: FRA123456)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="text-center font-mono"
                />
              </div>
              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                <Search className="w-4 h-4 mr-2" />
                खोजें
              </Button>
            </div>
            
            {/* Demo IDs for testing */}
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">डेमो के लिए इन आईडी का उपयोग करें:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchId('FRA123456')}>
                  FRA123456 (स्वीकृत)
                </Badge>
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchId('FRA789012')}>
                  FRA789012 (लंबित)
                </Badge>
                <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchId('FRA345678')}>
                  FRA345678 (अस्वीकृत)
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {applicationData && (
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">
                  आवेदन विवरण - {applicationData.id}
                </CardTitle>
                <Badge className={getStatusColor(applicationData.status)}>
                  {getStatusIcon(applicationData.status)}
                  <span className="ml-1">{getStatusText(applicationData.status)}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">आवेदक का नाम</Label>
                  <p className="text-foreground font-medium">{applicationData.applicantName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">आवेदन तारीख</Label>
                  <p className="text-foreground font-medium">{applicationData.submissionDate}</p>
                </div>
              </div>

              {/* Applied Schemes */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">चुनी गई योजनाएं</Label>
                <div className="flex flex-wrap gap-2">
                  {applicationData.schemes.map((scheme: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {scheme}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Progress Timeline */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-3 block">प्रक्रिया की स्थिति</Label>
                <div className="space-y-3">
                  {[
                    { step: 'submitted', label: 'आवेदन जमा किया गया', completed: true },
                    { step: 'under_review', label: 'सत्यापन के अधीन', completed: applicationData.status !== 'pending' },
                    { step: 'decision', label: 'निर्णय लिया गया', completed: applicationData.status === 'approved' || applicationData.status === 'rejected' },
                    { step: 'completed', label: 'प्रक्रिया पूर्ण', completed: applicationData.status === 'approved' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`
                        w-3 h-3 rounded-full
                        ${item.completed ? 'bg-green-500' : 'bg-gray-300'}
                      `} />
                      <span className={`text-sm ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Officer Remarks */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">अधिकारी की टिप्पणी</Label>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-foreground">{applicationData.officerRemarks}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  रसीद डाउनलोड करें
                </Button>
                
                {applicationData.status === 'approved' && applicationData.landCoordinates && (
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    मानचित्र में भूमि देखें
                  </Button>
                )}
                
                {applicationData.status === 'rejected' && (
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    फिर से आवेदन करें
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {searchId && !applicationData && searchId.length > 0 && (
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
            <CardContent className="text-center py-8">
              <XCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium">आवेदन नहीं मिला</p>
              <p className="text-sm text-muted-foreground">कृपया सही आवेदन आईडी दर्ज करें</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracking;