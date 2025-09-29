import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Info } from "lucide-react";

const AIDecisionSupport = () => {
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);

  useEffect(() => {
    // Mock AI recommendations
    setRecommendations([
      {
        applicationId: "APP001",
        applicant: "Raj Kumar Meena",
        confidence: 92,
        status: "high_approval",
        reasons: [
          "All required documents verified",
          "Land coordinates match survey records",
          "No conflicting claims in the area",
          "Applicant belongs to registered tribal community"
        ],
        suggestedAction: "Approve"
      },
      {
        applicationId: "APP002", 
        applicant: "Sunita Bhil",
        confidence: 78,
        status: "moderate_approval",
        reasons: [
          "Documents partially verified",
          "Minor discrepancy in land boundaries",
          "Valid tribal certificate present"
        ],
        suggestedAction: "Request field verification"
      },
      {
        applicationId: "APP003",
        applicant: "Arjun Gond",
        confidence: 45,
        status: "low_approval",
        reasons: [
          "Conflicting land claims detected",
          "Environmental clearance required",
          "Additional documentation needed"
        ],
        suggestedAction: "Hold for review"
      }
    ]);

    setSchemes([
      {
        name: "PM-Kisan Samman Nidhi",
        applicability: "High",
        criteria: "Small and marginal farmers with cultivable land",
        benefits: "₹6,000 per year in three installments",
        documents: ["Land records", "Aadhaar", "Bank account"]
      },
      {
        name: "Jal Jeevan Mission",
        applicability: "Medium", 
        criteria: "Households without piped water connection",
        benefits: "Free piped water connection to household",
        documents: ["Residence proof", "Aadhaar", "BPL certificate"]
      },
      {
        name: "MGNREGA",
        applicability: "High",
        criteria: "Rural households seeking employment guarantee",
        benefits: "100 days guaranteed employment per household",
        documents: ["Job card", "Aadhaar", "Bank account"]
      },
      {
        name: "Forest Rights Act",
        applicability: "Very High",
        criteria: "Tribal communities with traditional forest occupation",
        benefits: "Individual/Community forest rights recognition",
        documents: ["Tribal certificate", "Occupation proof", "Survey records"]
      },
      {
        name: "PM Awas Yojana",
        applicability: "Medium",
        criteria: "Homeless or inadequate housing",
        benefits: "₹1.20 lakh assistance for house construction",
        documents: ["Income certificate", "Land documents", "Aadhaar"]
      }
    ]);
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600 bg-green-50";
    if (confidence >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getConfidenceIcon = (confidence: number) => {
    if (confidence >= 80) return <CheckCircle className="w-4 h-4" />;
    if (confidence >= 60) return <Info className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const getApplicabilityColor = (level: string) => {
    switch (level) {
      case "Very High": return "bg-green-100 text-green-800";
      case "High": return "bg-blue-100 text-blue-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          {t('aiDecisionSupport')}
        </CardTitle>
        <CardDescription>
          AI-powered recommendations for application processing and scheme suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations">Application Analysis</TabsTrigger>
            <TabsTrigger value="schemes">Scheme Matching</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{rec.applicationId}</h4>
                      <p className="text-muted-foreground">{rec.applicant}</p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getConfidenceColor(rec.confidence)}`}>
                      {getConfidenceIcon(rec.confidence)}
                      <span className="font-medium">{rec.confidence}% Confidence</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium mb-2">AI Analysis:</h5>
                      <ul className="space-y-1">
                        {rec.reasons.map((reason: string, idx: number) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="font-medium">Suggested Action:</span>
                        <Badge variant="outline">{rec.suggestedAction}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm">Apply Suggestion</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="schemes" className="space-y-4">
            <div className="grid gap-4">
              {schemes.map((scheme, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg">{scheme.name}</h4>
                      <Badge className={getApplicabilityColor(scheme.applicability)}>
                        {scheme.applicability} Match
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Eligibility Criteria:</h5>
                        <p className="text-sm text-muted-foreground">{scheme.criteria}</p>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Benefits:</h5>
                        <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Required Documents:</h5>
                      <div className="flex flex-wrap gap-2">
                        {scheme.documents.map((doc: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end mt-4 pt-3 border-t">
                      <Button size="sm">Recommend to Applicant</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIDecisionSupport;