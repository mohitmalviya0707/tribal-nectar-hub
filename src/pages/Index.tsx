import { useState } from "react";
import Header from "@/components/Header";
import CitizenPortal from "@/components/CitizenPortal";
import OfficerDashboard from "@/components/OfficerDashboard";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [userType, setUserType] = useState<'citizen' | 'officer' | null>(null);

  const renderMainContent = () => {
    if (!userType) {
      return (
        <div className="min-h-screen bg-background">
          {/* Hero Landing */}
          <div className="relative overflow-hidden">
            <div className="gov-gradient-hero">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    भारत सरकार
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    जनजातीय कार्य मंत्रालय
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 opacity-90">
                    Ministry of Tribal Affairs, Government of India
                  </p>
                  <div className="max-w-3xl mx-auto">
                    <p className="text-lg mb-8 opacity-80">
                      वन अधिकार अधिनियम 2006 और सरकारी कल्याण योजनाओं के लिए आवेदन करें। 
                      अपनी आवेदन स्थिति ट्रैक करें और भूमि रिकॉर्ड देखें।
                    </p>
                    <p className="text-base mb-8 opacity-70">
                      Apply for Forest Rights Act 2006 and government welfare schemes. 
                      Track your application status and view land records.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Selection Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">पोर्टल चुनें / Select Portal</h3>
              <p className="text-lg text-muted-foreground">
                अपनी भूमिका के अनुसार पोर्टल का चयन करें
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Citizen Portal Card */}
              <div 
                className="gov-card cursor-pointer hover:shadow-xl transition-all p-8 text-center"
                onClick={() => setUserType('citizen')}
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold mb-4">नागरिक पोर्टल</h4>
                <h5 className="text-xl font-semibold mb-4 text-muted-foreground">Citizen Portal</h5>
                <p className="text-muted-foreground mb-6">
                  सरकारी योजनाओं के लिए आवेदन करें, स्थिति ट्रैक करें और भूमि अधिकार प्राप्त करें।
                </p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• वन अधिकार अधिनियम 2006 आवेदन</li>
                  <li>• PM किसान, जल जीवन मिशन</li>
                  <li>• छात्रवृत्ति और ऋण योजनाएं</li>
                  <li>• आवेदन स्थिति ट्रैकिंग</li>
                </ul>
              </div>

              {/* Officer Portal Card */}
              <div 
                className="gov-card cursor-pointer hover:shadow-xl transition-all p-8 text-center"
                onClick={() => setUserType('officer')}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold mb-4">अधिकारी डैशबोर्ड</h4>
                <h5 className="text-xl font-semibold mb-4 text-muted-foreground">Officer Dashboard</h5>
                <p className="text-muted-foreground mb-6">
                  आवेदनों की समीक्षा करें, अनुमोदन/अस्वीकृति करें और भूमि रिकॉर्ड प्रबंधित करें।
                </p>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• आवेदन प्रबंधन और समीक्षा</li>
                  <li>• भूमि मानचित्रण और अनुमोदन</li>
                  <li>• डेटा एनालिटिक्स और रिपोर्ट</li>
                  <li>• AI निर्णय सहायता प्रणाली</li>
                </ul>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">मुख्य सुविधाएं / Key Features</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">24/7 सहायता</h4>
                  <p className="text-muted-foreground">
                    बहुभाषी चैटबॉट सहायता
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">भूमि मानचित्रण</h4>
                  <p className="text-muted-foreground">
                    इंटरैक्टिव मैप के साथ भूमि रिकॉर्ड
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">डेटा एनालिटिक्स</h4>
                  <p className="text-muted-foreground">
                    व्यापक रिपोर्ट और विश्लेषण
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return userType === 'citizen' ? <CitizenPortal /> : <OfficerDashboard />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userType={userType} onUserTypeChange={setUserType} />
      
      <main className={userType ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" : ""}>
        {renderMainContent()}
      </main>

      <ChatBot />
    </div>
  );
};

export default Index;
