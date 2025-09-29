import { createContext, useContext, useState, ReactNode } from "react";

const translations = {
  en: {
    title: "Tribal Affairs Portal",
    subtitle: "Government of India",
    citizen: "I am a Citizen",
    officer: "I am an Officer",
    newApplication: "New Application",
    applicationStatus: "Application Status",
    startApplication: "Start Application",
    checkStatus: "Check Status",
    backButton: "← Go Back",
    citizenServices: "Citizen Services",
    availableSchemes: "Available Schemes",
    applyNow: "Apply Now",
    personalInfo: "Personal Information",
    additionalInfo: "Additional Information",
    documents: "Documents",
    schemeSelection: "Scheme Selection",
    fullName: "Full Name",
    aadhaar: "Aadhaar Number",
    mobile: "Mobile Number",
    email: "Email Address",
    dob: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    fatherName: "Father's Name",
    caste: "Caste/Tribe",
    address: "Complete Address",
    village: "Village",
    district: "District",
    state: "State",
    pincode: "Pin Code",
    uploadDocuments: "Upload Required Documents",
    selectSchemes: "Select Schemes",
    submit: "Submit",
    next: "Next",
    previous: "Previous",
    back: "Back",
    applicationSubmitted: "Application Submitted Successfully",
    yourApplicationId: "Your Application ID",
    keepThisId: "Please keep this ID safe for future reference",
    returnToDashboard: "Return to Dashboard",
    downloadReceipt: "Download Receipt"
  },
  hi: {
    title: "जनजातीय मामले पोर्टल",
    subtitle: "भारत सरकार",
    citizen: "मैं नागरिक हूं",
    officer: "मैं अधिकारी हूं",
    newApplication: "नया आवेदन",
    applicationStatus: "आवेदन की स्थिति",
    startApplication: "आवेदन शुरू करें",
    checkStatus: "स्थिति देखें",
    backButton: "← वापस जाएं",
    citizenServices: "नागरिक सेवाएं",
    availableSchemes: "उपलब्ध योजनाएं",
    applyNow: "आवेदन करें",
    personalInfo: "व्यक्तिगत जानकारी",
    additionalInfo: "पूरी जानकारी",
    documents: "दस्तावेज अपलोड",
    schemeSelection: "योजना चयन",
    fullName: "पूरा नाम",
    aadhaar: "आधार नंबर",
    mobile: "मोबाइल नंबर",
    email: "ईमेल पता",
    dob: "जन्म तारीख",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    fatherName: "पिता का नाम",
    caste: "जाति",
    address: "पूरा पता",
    village: "गांव",
    district: "जिला",
    state: "राज्य",
    pincode: "पिन कोड",
    uploadDocuments: "आवश्यक दस्तावेज अपलोड करें",
    selectSchemes: "योजनाओं का चयन करें",
    submit: "सबमिट करें",
    next: "अगला",
    previous: "पिछला",
    back: "वापस",
    applicationSubmitted: "आवेदन सफलतापूर्वक जमा हो गया",
    yourApplicationId: "आपका आवेदन नंबर",
    keepThisId: "कृपया इस नंबर को भविष्य के लिए संभाल कर रखें",
    returnToDashboard: "डैशबोर्ड पर वापस जाएं",
    downloadReceipt: "रसीद डाउनलोड करें"
  }
};

type Language = 'en' | 'hi';
type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('hi');

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};