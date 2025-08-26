import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Briefcase, FileText, Zap, Upload, Download, Star, Users, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LandingPageProps {
  onSelectPath: (path: 'student' | 'employee') => void;
  onResumeImport: (resumeData: any) => void;
}

const LandingPage = ({ onSelectPath, onResumeImport }: LandingPageProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.includes('pdf') && !file.type.includes('document')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive"
      });
      return;
    }

    // Mock resume parsing - in real app, this would be an AI service
    const mockResumeData = {
      personalInfo: {
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        address: 'San Francisco, CA',
        linkedIn: 'linkedin.com/in/johndoe',
        portfolio: 'johndoe.dev'
      },
      workExperience: [{
        id: '1',
        company: 'Tech Corporation',
        position: 'Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: '2024-01',
        current: false,
        responsibilities: ['Developed web applications', 'Collaborated with team'],
        achievements: ['Increased performance by 40%']
      }],
      education: [{
        id: '1',
        institution: 'University of California',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2018-09',
        endDate: '2022-05',
        gpa: '3.8',
        achievements: ["Dean's List"]
      }],
      skills: {
        technical: ['JavaScript', 'React', 'Node.js'],
        soft: ['Communication', 'Leadership'],
        languages: ['English', 'Spanish']
      },
      projects: [{
        id: '1',
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce solution',
        technologies: ['React', 'Node.js', 'MongoDB'],
        startDate: '2021-01',
        endDate: '2021-06',
        achievements: ['Handled 1000+ daily users']
      }]
    };

    toast({
      title: "Resume imported successfully!",
      description: "We've extracted your information and pre-filled the form.",
    });

    onResumeImport(mockResumeData);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Resumes Created" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
    { icon: CheckCircle, value: "95%", label: "ATS Pass Rate" },
    { icon: Download, value: "50,000+", label: "Downloads" }
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Content",
      description: "Smart suggestions and optimization to make your resume stand out"
    },
    {
      icon: FileText,
      title: "ATS-Optimized",
      description: "Guaranteed to pass Applicant Tracking Systems used by 99% of companies"
    },
    {
      icon: Upload,
      title: "Import Existing Resume",
      description: "Upload your current resume and we'll help you improve it"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Background with Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-blue-50">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <FileText className="w-20 h-20 text-primary mx-auto mb-6" />
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-foreground mb-8 leading-tight">
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            <span className="text-foreground">Resume Builder</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Create professional, ATS-friendly resumes that get you noticed. 
            <span className="font-semibold text-foreground"> Upload your existing resume or start fresh</span> - 
            our AI will help you craft the perfect resume.
          </p>

          {/* Resume Import Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-16"
          >
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                dragActive 
                  ? 'border-primary bg-primary-light scale-105' 
                  : 'border-border hover:border-primary/50 bg-white/50 backdrop-blur-sm'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              
              <motion.div
                animate={{ y: dragActive ? -5 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-3">Import Your Existing Resume</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Drag & drop your PDF or Word document, or click to browse. 
                  Our AI will extract and optimize your information.
                </p>
                <Button
                  onClick={handleFileSelect}
                  className="btn-upload"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File to Import
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex-1 h-px bg-border"></div>
            <span className="px-6 text-muted-foreground font-medium">or start from scratch</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
        </motion.div>

        {/* User Path Selection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-3xl font-display font-semibold text-center mb-12 text-foreground">
            Choose Your Path
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Path */}
            <motion.div
              whileHover={{ scale: 1.02, y: -10 }}
              whileTap={{ scale: 0.98 }}
              className="card-glass p-10 text-center cursor-pointer group relative overflow-hidden"
              onClick={() => onSelectPath('student')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <GraduationCap className="w-20 h-20 text-primary mx-auto mb-6 group-hover:text-primary-hover transition-colors" />
              </motion.div>
              <h3 className="text-2xl font-display font-semibold mb-4 relative z-10">I am a Student</h3>
              <p className="text-muted-foreground mb-8 relative z-10">
                Perfect for students, recent graduates, and those starting their careers. 
                Focus on education, projects, and potential.
              </p>
              <Button className="btn-hero w-full relative z-10">
                Get Started as Student
              </Button>
            </motion.div>

            {/* Employee Path */}
            <motion.div
              whileHover={{ scale: 1.02, y: -10 }}
              whileTap={{ scale: 0.98 }}
              className="card-glass p-10 text-center cursor-pointer group relative overflow-hidden"
              onClick={() => onSelectPath('employee')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <motion.div
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10"
              >
                <Briefcase className="w-20 h-20 text-primary mx-auto mb-6 group-hover:text-primary-hover transition-colors" />
              </motion.div>
              <h3 className="text-2xl font-display font-semibold mb-4 relative z-10">I am an Employee</h3>
              <p className="text-muted-foreground mb-8 relative z-10">
                Ideal for working professionals looking to advance their careers. 
                Highlight experience, achievements, and expertise.
              </p>
              <Button className="btn-hero w-full relative z-10">
                Get Started as Professional
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-semibold text-center mb-16 text-foreground">
            Why Choose Our Resume Builder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                className="card-glass p-8 text-center group hover:shadow-glow transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                className="group"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="text-sm text-muted-foreground mt-12"
          >
            Trusted by thousands of job seekers worldwide • ATS Compatible • HR Approved • Industry Standard
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;