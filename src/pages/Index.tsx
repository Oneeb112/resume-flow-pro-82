import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import ResumeBuilder from "@/components/ResumeBuilder";
import { ResumeData } from "@/types/resume";

type UserPath = 'student' | 'employee' | null;

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'builder'>('landing');
  const [userPath, setUserPath] = useState<UserPath>(null);
  const [importedResumeData, setImportedResumeData] = useState<ResumeData | null>(null);

  const handleSelectPath = (path: UserPath) => {
    setUserPath(path);
    setCurrentView('builder');
  };

  const handleResumeImport = (resumeData: ResumeData) => {
    setImportedResumeData(resumeData);
    // Auto-detect user type based on imported data
    const hasWorkExperience = resumeData.workExperience && resumeData.workExperience.length > 0;
    const userType = hasWorkExperience ? 'employee' : 'student';
    setUserPath(userType);
    setCurrentView('builder');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setUserPath(null);
    setImportedResumeData(null);
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage 
          onSelectPath={handleSelectPath} 
          onResumeImport={handleResumeImport}
        />
      )}
      {currentView === 'builder' && userPath && (
        <ResumeBuilder 
          userType={userPath} 
          onBack={handleBackToHome}
          initialData={importedResumeData}
        />
      )}
    </>
  );
};

export default Index;
