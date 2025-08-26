import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, FileText, Zap } from "lucide-react";

interface LandingPageProps {
  onSelectPath: (path: 'student' | 'employee') => void;
}

const LandingPage = ({ onSelectPath }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            ATS Resume Builder
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Create professional, ATS-friendly resumes that get you noticed. 
            Our AI helps you craft the perfect resume tailored to your career level.
          </p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="card-glass p-6 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Smart suggestions and optimization</p>
            </div>
            <div className="card-glass p-6 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">ATS-Friendly</h3>
              <p className="text-sm text-muted-foreground">Passes Applicant Tracking Systems</p>
            </div>
            <div className="card-glass p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.div>
              <h3 className="font-semibold mb-2">Instant Export</h3>
              <p className="text-sm text-muted-foreground">Download PDF instantly</p>
            </div>
          </motion.div>
        </motion.div>

        {/* User Path Selection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
            Choose Your Path
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Path */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated p-8 text-center cursor-pointer group"
              onClick={() => onSelectPath('student')}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4 group-hover:text-primary-hover transition-colors" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">I am a Student</h3>
              <p className="text-muted-foreground mb-6">
                Perfect for students, recent graduates, and those starting their careers
              </p>
              <Button className="btn-hero w-full">
                Get Started as Student
              </Button>
            </motion.div>

            {/* Employee Path */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="card-elevated p-8 text-center cursor-pointer group"
              onClick={() => onSelectPath('employee')}
            >
              <motion.div
                whileHover={{ rotate: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Briefcase className="w-16 h-16 text-primary mx-auto mb-4 group-hover:text-primary-hover transition-colors" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">I am an Employee</h3>
              <p className="text-muted-foreground mb-6">
                Ideal for working professionals looking to advance their careers
              </p>
              <Button className="btn-hero w-full">
                Get Started as Professional
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted by thousands of job seekers</p>
          <div className="flex justify-center items-center space-x-8 opacity-50">
            <div className="text-xs font-medium">✓ ATS Compatible</div>
            <div className="text-xs font-medium">✓ HR Approved</div>
            <div className="text-xs font-medium">✓ Industry Standard</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;