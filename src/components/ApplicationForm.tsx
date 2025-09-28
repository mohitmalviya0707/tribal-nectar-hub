import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Upload, FileText, CheckCircle } from "lucide-react";

interface ApplicationFormProps {
  onBack: () => void;
  onComplete: (applicationId: string) => void;
}

const ApplicationForm = ({ onBack, onComplete }: ApplicationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 - Basic Info
    fullName: '',
    aadhaar: '',
    mobile: '',
    email: '',
    dob: '',
    gender: '',
    // Step 2 - Additional Info
    fatherName: '',
    address: '',
    village: '',
    district: '',
    state: '',
    pincode: '',
    caste: '',
    // Step 3 - Documents
    documents: {
      aadhaarCard: null,
      casteCard: null,
      incomeCard: null,
      landDocuments: null
    },
    // Step 4 - Schemes
    selectedSchemes: []
  });

  const schemes = [
    { id: 'fra2006', name: 'Forest Rights Act 2006', description: 'वन अधिकार अधिनियम 2006' },
    { id: 'pmkisan', name: 'PM Kisan Yojana', description: 'प्रधानमंत्री किसान सम्मान निधि' },
    { id: 'jaljeevan', name: 'Jal Jeevan Mission', description: 'जल जीवन मिशन' },
    { id: 'scholarship', name: 'Tribal Scholarship', description: 'आदिवासी छात्रवृत्ति' },
    { id: 'loan', name: 'Tribal Loan Scheme', description: 'आदिवासी ऋण योजना' }
  ];

  const states = ['Madhya Pradesh', 'Tripura', 'Odisha', 'Telangana'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSchemeToggle = (schemeId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedSchemes: prev.selectedSchemes.includes(schemeId)
        ? prev.selectedSchemes.filter(id => id !== schemeId)
        : [...prev.selectedSchemes, schemeId]
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Generate application ID and complete
      const applicationId = `FRA${Date.now().toString().slice(-6)}`;
      onComplete(applicationId);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">पूरा नाम *</Label>
                <Input
                  id="fullName"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aadhaar">आधार नंबर *</Label>
                <Input
                  id="aadhaar"
                  placeholder="xxxx-xxxx-xxxx"
                  value={formData.aadhaar}
                  onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">मोबाइल नंबर *</Label>
                <Input
                  id="mobile"
                  placeholder="10 digit mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ईमेल पता</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">जन्म तारीख *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">लिंग *</Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">पुरुष</SelectItem>
                    <SelectItem value="female">महिला</SelectItem>
                    <SelectItem value="other">अन्य</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherName">पिता का नाम *</Label>
                <Input
                  id="fatherName"
                  placeholder="Father's name"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caste">जाति *</Label>
                <Input
                  id="caste"
                  placeholder="Caste/Tribe"
                  value={formData.caste}
                  onChange={(e) => handleInputChange('caste', e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">पूरा पता *</Label>
                <Textarea
                  id="address"
                  placeholder="Complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="village">गांव *</Label>
                <Input
                  id="village"
                  placeholder="Village name"
                  value={formData.village}
                  onChange={(e) => handleInputChange('village', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">जिला *</Label>
                <Input
                  id="district"
                  placeholder="District name"
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">राज्य *</Label>
                <Select onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">पिन कोड *</Label>
                <Input
                  id="pincode"
                  placeholder="6 digit pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">आवश्यक दस्तावेज अपलोड करें</h3>
              <p className="text-sm text-muted-foreground">सभी दस्तावेज PDF या JPG फॉर्मेट में होने चाहिए</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'aadhaarCard', label: 'आधार कार्ड *', required: true },
                { key: 'casteCard', label: 'जाति प्रमाण पत्र *', required: true },
                { key: 'incomeCard', label: 'आय प्रमाण पत्र', required: false },
                { key: 'landDocuments', label: 'भूमि दस्तावेज', required: false }
              ].map((doc) => (
                <div key={doc.key} className="space-y-2">
                  <Label className="text-sm font-medium">{doc.label}</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      फाइल अपलोड करने के लिए यहाँ क्लिक करें
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      फाइल चुनें
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">योजनाओं का चयन करें</h3>
              <p className="text-sm text-muted-foreground">जिन योजनाओं के लिए आवेदन करना चाहते हैं उन्हें चुनें</p>
            </div>
            
            <div className="space-y-4">
              {schemes.map((scheme) => (
                <div key={scheme.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={scheme.id}
                      checked={formData.selectedSchemes.includes(scheme.id)}
                      onCheckedChange={() => handleSchemeToggle(scheme.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={scheme.id} className="font-medium cursor-pointer">
                        {scheme.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                  `}>
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-8 h-0.5 ${step < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              नया आवेदन
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              चरण {currentStep} का 4 - {
                currentStep === 1 ? 'व्यक्तिगत जानकारी' :
                currentStep === 2 ? 'पूरी जानकारी' :
                currentStep === 3 ? 'दस्तावेज अपलोड' : 'योजना चयन'
              }
            </p>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t border-muted/20">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? 'वापस' : 'पिछला'}
              </Button>
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90">
                {currentStep === 4 ? 'सबमिट करें' : 'अगला'}
                {currentStep < 4 && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;