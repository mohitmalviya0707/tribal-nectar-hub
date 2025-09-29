import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload, FileText, Edit3, Save, Loader2 } from "lucide-react";

declare global {
  interface Window {
    puter: any;
  }
}

interface DocumentUploadProps {
  onTextExtracted?: (text: string) => void;
}

const DocumentUpload = ({ onTextExtracted }: DocumentUploadProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, JPG, or PNG files only",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Check if Puter.ai is available
      if (!window.puter) {
        throw new Error("Puter.ai service not available");
      }

      // Convert file to base64 for Puter.ai API
      const base64 = await convertToBase64(file);
      
      // Mock OCR extraction using Puter.ai (replace with actual API call)
      const mockExtractedText = await mockOCRExtraction(file);
      
      setExtractedText(mockExtractedText);
      setEditedText(mockExtractedText);
      onTextExtracted?.(mockExtractedText);
      
      toast({
        title: t('textExtracted'),
        description: t('reviewAndEdit'),
      });
    } catch (error) {
      console.error('OCR extraction failed:', error);
      toast({
        title: "OCR Extraction Failed",
        description: "Unable to extract text from document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [toast, t, onTextExtracted]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Mock OCR function - replace with actual Puter.ai API call
  const mockOCRExtraction = async (file: File): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted text based on file type
    if (file.type === 'application/pdf') {
      return `Forest Rights Act - Application Document
      
Applicant Name: Rajesh Kumar Meena
Father's Name: Mohan Lal Meena
Village: Kotra, District: Udaipur, State: Rajasthan
Pin Code: 313001

Land Details:
- Survey Number: 123/2
- Area: 2.5 acres
- Land Type: Forest land for cultivation
- GPS Coordinates: 24.5854°N, 73.7125°E

Application for individual forest rights under Section 3(1)(a) of the Forest Rights Act, 2006.

Documents Attached:
1. Aadhaar Card
2. Voter ID Card  
3. Village Residence Proof
4. Land Occupation Evidence`;
    } else {
      return `Identity Document Extracted Text:
      
Name: Sunita Bhil
Father's Name: Ramesh Bhil
Address: Village Garhi, Banswara, Gujarat - 327001
Aadhaar: 1234 5678 9012
Date of Birth: 15/08/1985
Gender: Female

Additional Information:
- Tribe: Bhil
- Occupation: Agriculture
- Annual Income: Rs. 45,000`;
    }
  };

  const handleSaveChanges = () => {
    setExtractedText(editedText);
    setIsEditing(false);
    onTextExtracted?.(editedText);
    toast({
      title: "Changes Saved",
      description: "Extracted text has been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          {t('uploadFRADocuments')}
        </CardTitle>
        <CardDescription>
          Upload PDF or image documents for OCR text extraction
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer ${uploading ? 'pointer-events-none opacity-50' : ''}`}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">{t('processingDocument')}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload FRA documents</p>
                <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
              </div>
            )}
          </label>
        </div>

        {extractedText && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{t('ocrExtraction')}</h4>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {isEditing ? 'Cancel' : t('editText')}
                </Button>
                {isEditing && (
                  <Button size="sm" onClick={handleSaveChanges}>
                    <Save className="w-4 h-4 mr-1" />
                    {t('saveChanges')}
                  </Button>
                )}
              </div>
            </div>
            
            {isEditing ? (
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
                placeholder="Edit extracted text..."
              />
            ) : (
              <div className="bg-muted p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">{extractedText}</pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentUpload;