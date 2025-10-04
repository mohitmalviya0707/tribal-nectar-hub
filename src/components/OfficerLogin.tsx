import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface OfficerLoginProps {
  onBack: () => void;
  onLogin: () => void;
}

const OfficerLogin = ({ onBack, onLogin }: OfficerLoginProps) => {
  const { t } = useLanguage();
  const [loginData, setLoginData] = useState({
    officerId: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Demo credentials
  const DEMO_OFFICER_ID = "OFFICER2024";
  const DEMO_PASSWORD = "demo123";

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate credentials
    if (loginData.officerId === DEMO_OFFICER_ID && loginData.password === DEMO_PASSWORD) {
      onLogin();
    } else {
      setError(t('invalidCredentials'));
    }
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
          {t('backButton')}
        </Button>

        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              {t('officerLogin')}
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {t('enterOfficerCredentials')}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="officerId" className="text-sm font-medium flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-primary" />
                  {t('officerId')} *
                </Label>
                <Input
                  id="officerId"
                  placeholder={t('enterOfficerId')}
                  value={loginData.officerId}
                  onChange={(e) => handleInputChange('officerId', e.target.value)}
                  required
                  className="border-muted-foreground/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-primary" />
                  {t('password')} *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('enterPassword')}
                  value={loginData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="border-muted-foreground/20 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
              >
                {t('login')}
              </Button>
            </form>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                {t('demoCredentials')}:
              </p>
              <div className="space-y-1 text-xs text-blue-800">
                <p><strong>{t('officerId')}:</strong> OFFICER2024</p>
                <p><strong>{t('password')}:</strong> demo123</p>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-muted/20">
              <p className="text-xs text-muted-foreground">
                {t('secureLogin')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfficerLogin;
