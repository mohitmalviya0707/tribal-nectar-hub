import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Phone, CreditCard } from "lucide-react";

interface CitizenLoginProps {
  onBack: () => void;
  onLogin: () => void;
}

const CitizenLogin = ({ onBack, onLogin }: CitizenLoginProps) => {
  const [loginData, setLoginData] = useState({
    aadhaar: '',
    mobile: '',
    name: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For prototype - just proceed to application
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          वापस जाएं
        </Button>

        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-primary">
              नागरिक लॉगिन
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              अपनी जानकारी दर्ज करें
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-primary" />
                  पूरा नाम *
                </Label>
                <Input
                  id="name"
                  placeholder="अपना पूरा नाम दर्ज करें"
                  value={loginData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="border-muted-foreground/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar" className="text-sm font-medium flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-primary" />
                  आधार नंबर *
                </Label>
                <Input
                  id="aadhaar"
                  placeholder="xxxx-xxxx-xxxx"
                  value={loginData.aadhaar}
                  onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                  maxLength={12}
                  required
                  className="border-muted-foreground/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-primary" />
                  मोबाइल नंबर *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="10 अंकों का मोबाइल नंबर"
                  value={loginData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  maxLength={10}
                  required
                  className="border-muted-foreground/20 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
              >
                आगे बढ़ें
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-muted/20">
              <p className="text-xs text-muted-foreground">
                यह एक प्रोटोटाइप है। वास्तविक लॉगिन कार्यक्षमता शीघ्र उपलब्ध होगी।
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenLogin;