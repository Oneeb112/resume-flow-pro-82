import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import ResumeBuilder from "@/components/ResumeBuilder";

type UserPath = 'student' | 'employee' | null;

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'builder'>('landing');
  const [userPath, setUserPath] = useState<UserPath>(null);

  const handleSelectPath = (path: UserPath) => {
    setUserPath(path);
    setCurrentView('builder');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    setUserPath(null);
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage onSelectPath={handleSelectPath} />
      )}
      {currentView === 'builder' && userPath && (
        <ResumeBuilder userType={userPath} onBack={handleBackToHome} />
      )}
    </>
  );
};

export default Index;
