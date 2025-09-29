import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ApplicationSuccessProps {
  applicationId: string;
  onReturnToDashboard: () => void;
}

const ApplicationSuccess = ({ applicationId, onReturnToDashboard }: ApplicationSuccessProps) => {
  const { t } = useLanguage();

  const handleDownloadReceipt = () => {
    // Create a simple receipt
    const receiptContent = `
आवेदन रसीद / Application Receipt
================================
आवेदन संख्या / Application ID: ${applicationId}
दिनांक / Date: ${new Date().toLocaleDateString('hi-IN')}
स्थिति / Status: जमा किया गया / Submitted

कृपया इस संख्या को भविष्य के लिए संभाल कर रखें।
Please keep this ID safe for future reference.

जनजातीय मामले मंत्रालय, भारत सरकार
Ministry of Tribal Affairs, Government of India
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${applicationId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
      <Card className="max-w-md w-full shadow-lg border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            {t('applicationSubmitted')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-sm text-muted-foreground mb-2">
              {t('yourApplicationId')}
            </p>
            <p className="text-2xl font-bold text-primary font-mono">
              {applicationId}
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {t('keepThisId')}
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={handleDownloadReceipt}
              variant="outline" 
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('downloadReceipt')}
            </Button>
            
            <Button 
              onClick={onReturnToDashboard}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Home className="w-4 h-4 mr-2" />
              {t('returnToDashboard')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationSuccess;