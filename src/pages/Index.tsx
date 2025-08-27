import { useState } from "react";
import { motion } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import ResumeBuilder from "@/components/ResumeBuilder";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Index() {
  const [selectedPath, setSelectedPath] = useState<'student' | 'employee' | null>(null);

  const handlePathSelection = (path: 'student' | 'employee') => {
    setSelectedPath(path);
  };

  const handleBackToHome = () => {
    setSelectedPath(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20">
        {selectedPath ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResumeBuilder 
              userType={selectedPath} 
              onBack={handleBackToHome}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onSelectPath={handlePathSelection} />
          </motion.div>
        )}
      </main>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
}
