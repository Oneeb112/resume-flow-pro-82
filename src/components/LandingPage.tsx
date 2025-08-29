import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Briefcase, FileText, Zap, Upload, Download, Star, Users, CheckCircle, Loader2, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import FloatingActionButton from "@/components/FloatingActionButton";
import { importResume } from "@/lib/resumeImport";

interface LandingPageProps {
  onSelectPath: (path: 'student' | 'employee') => void;
}

const LandingPage = ({ onSelectPath }: LandingPageProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showPathSelection, setShowPathSelection] = useState(false);
  const [importedData, setImportedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Refs for scroll animations
  const heroRef = useRef(null);
  const uploadRef = useRef(null);
  const pathRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  // InView hooks for scroll animations
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isUploadInView = useInView(uploadRef, { once: true, margin: "-100px" });
  const isPathInView = useInView(pathRef, { once: true, margin: "-100px" });
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = () => {
    // Ensure the file input is properly triggered on mobile
    if (fileInputRef.current) {
      try {
        // Force focus and click for mobile compatibility
        fileInputRef.current.focus();
        fileInputRef.current.click();
      } catch (error) {
        console.error('File input error:', error);
        // Fallback: try to show a more mobile-friendly message
        toast({
          title: "File selection issue",
          description: "Please try tapping the button again, or use your device's file manager to select a file.",
          variant: "destructive",
        });
      }
    }
  };

  const getResumeTemplate = (filename: string) => {
    const lowerFilename = filename.toLowerCase();
    
    if (lowerFilename.includes('student') || lowerFilename.includes('graduate')) {
      return {
        personalInfo: {
          fullName: "Alex Johnson",
          email: "alex.johnson@university.edu",
          phone: "+1 (555) 123-4567",
          address: "University City, CA",
          linkedIn: "linkedin.com/in/alexjohnson",
          portfolio: "alexjohnson.dev"
        },
        workExperience: [
          {
            id: "1",
            company: "University Research Lab",
            position: "Research Assistant",
            location: "University City, CA",
            startDate: "2023-01",
            endDate: "2024-01",
            current: false,
            responsibilities: ["Conducted research on AI algorithms", "Assisted with data analysis", "Presented findings to faculty"],
            achievements: ["Published 2 research papers", "Received Dean's Research Award"]
          }
        ],
        education: [
          {
            id: "1",
            institution: "University of Technology",
            degree: "Bachelor of Science",
            field: "Computer Science",
            startDate: "2020-09",
            endDate: "2024-05",
            gpa: "3.9",
            achievements: ["Dean's List", "Computer Science Honor Society", "Valedictorian"]
          }
        ],
        skills: {
          technical: ["Python", "Machine Learning", "Data Analysis", "JavaScript", "React"],
          soft: ["Research", "Problem Solving", "Communication", "Teamwork"],
          languages: ["English", "Spanish"]
        },
        projects: [
          {
            id: "1",
            name: "AI-Powered Study Assistant",
            description: "Developed an intelligent study planner using machine learning algorithms",
            technologies: ["Python", "TensorFlow", "React", "Node.js"],
            startDate: "2023-03",
            endDate: "2023-12",
            achievements: ["Won University Innovation Award", "Used by 500+ students"]
          }
        ]
      };
    } else if (lowerFilename.includes('creative') || lowerFilename.includes('design')) {
      return {
        personalInfo: {
          fullName: "Sarah Chen",
          email: "sarah.chen@creative.com",
          phone: "+1 (555) 987-6543",
          address: "Creative District, NY",
          linkedIn: "linkedin.com/in/sarahchen",
          portfolio: "sarahchen.design"
        },
        workExperience: [
          {
            id: "1",
            company: "Creative Studio Inc.",
            position: "Senior Designer",
            location: "New York, NY",
            startDate: "2021-03",
            endDate: "2024-01",
            current: false,
            responsibilities: ["Led design projects for major brands", "Mentored junior designers", "Collaborated with marketing teams"],
            achievements: ["Increased client satisfaction by 40%", "Won 3 industry design awards"]
          }
        ],
        education: [
          {
            id: "1",
            institution: "Design Institute",
            degree: "Bachelor of Fine Arts",
            field: "Graphic Design",
            startDate: "2017-09",
            endDate: "2021-05",
            gpa: "3.8",
            achievements: ["Best Portfolio Award", "Design Leadership Program"]
          }
        ],
        skills: {
          technical: ["Adobe Creative Suite", "Figma", "Sketch", "3D Modeling", "Motion Graphics"],
          soft: ["Creativity", "Client Communication", "Project Management", "Art Direction"],
          languages: ["English", "Mandarin"]
        },
        projects: [
          {
            id: "1",
            name: "Brand Identity Redesign",
            description: "Complete brand overhaul for a Fortune 500 company",
            technologies: ["Adobe Illustrator", "Photoshop", "InDesign"],
            startDate: "2023-06",
            endDate: "2023-12",
            achievements: ["Increased brand recognition by 60%", "Featured in Design Week Magazine"]
          }
        ]
      };
    } else {
      // Default professional template
      return {
        personalInfo: {
          fullName: "Michael Rodriguez",
          email: "michael.rodriguez@techcorp.com",
          phone: "+1 (555) 456-7890",
          address: "Tech City, CA",
          linkedIn: "linkedin.com/in/michaelrodriguez",
          portfolio: "michaelrodriguez.dev"
        },
        workExperience: [
          {
            id: "1",
            company: "TechCorp Solutions",
            position: "Senior Software Engineer",
            location: "Tech City, CA",
            startDate: "2020-06",
            endDate: "2024-01",
            current: false,
            responsibilities: ["Led development of enterprise applications", "Mentored junior developers", "Architected scalable solutions"],
            achievements: ["Reduced system downtime by 80%", "Led team of 5 developers", "Increased performance by 300%"]
          }
        ],
        education: [
          {
            id: "1",
            institution: "Tech University",
            degree: "Master of Science",
            field: "Computer Science",
            startDate: "2018-09",
            endDate: "2020-05",
            gpa: "3.9",
            achievements: ["Graduate Research Fellowship", "Published 3 papers"]
          }
        ],
        skills: {
          technical: ["Java", "Spring Boot", "React", "Node.js", "AWS", "Docker", "Kubernetes"],
          soft: ["Leadership", "Problem Solving", "Team Management", "Strategic Planning"],
          languages: ["English", "Portuguese"]
        },
        projects: [
          {
            id: "1",
            name: "Enterprise Resource Platform",
            description: "Built a comprehensive ERP system serving 10,000+ users",
            technologies: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis"],
            startDate: "2022-01",
            endDate: "2023-06",
            achievements: ["Handled $50M+ in transactions", "99.99% uptime", "Reduced costs by 25%"]
          }
        ]
      };
    }
  };

  const handleFileUpload = async (file: File) => {
    // Enhanced file validation for mobile compatibility
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'text/plain'
    ];
    
    // Check both MIME type and file extension for mobile compatibility
    const fileExtension = file.name.toLowerCase().split('.').pop();
    const isValidType = validTypes.includes(file.type) || 
                       ['pdf', 'doc', 'docx', 'txt'].includes(fileExtension || '');
    
    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, Word document, or text file.",
        variant: "destructive",
      });
      return;
    }

    // File size validation (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);

    try {
      // Parse real content instead of using a dummy template
      const resumeData = await importResume(file);

      // Store the data temporarily and show path selection
      setImportedData(resumeData);
      setShowPathSelection(true);

      toast({
        title: "Resume imported successfully!",
        description: "Please choose your profile type to continue.",
      });
    } catch (error: any) {
      console.error('File import error:', error);
      
      // Mobile-specific error messages
      let errorMessage = error?.message || "There was an error processing your file. Please try again.";
      
      if (error?.message?.includes('worker')) {
        errorMessage = "PDF processing failed. For best results on mobile, try uploading a TXT or DOCX file instead.";
      } else if (error?.message?.includes('mammoth')) {
        errorMessage = "Word document processing failed. Please try a different file or format.";
      }
      
      toast({
        title: "Import failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handlePathSelection = (path: 'student' | 'employee') => {
    if (importedData) {
      // Store the data for the builder to pick up
      localStorage.setItem('importedResumeData', JSON.stringify(importedData));
      setShowPathSelection(false);
      setImportedData(null);
    }
    onSelectPath(path);
  };

  const features = [
    {
      icon: Star,
      title: "ATS Optimized",
      description: "Our resumes are designed to pass through Applicant Tracking Systems with flying colors."
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Export your resume in PDF, Word, or plain text formats for any application."
    },
    {
      icon: Users,
      title: "Expert Templates",
      description: "Choose from professionally designed templates created by HR experts."
    },
    {
      icon: CheckCircle,
      title: "Real-time Preview",
      description: "See changes instantly as you build your perfect resume."
    },
    {
      icon: Calendar,
      title: "Smart Date Picker",
      description: "Professional month/year calendar picker for easy date selection in forms."
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Resumes Created" },
    { icon: Star, value: "95%", label: "Success Rate" },
    { icon: Download, value: "100+", label: "Templates" },
    { icon: CheckCircle, value: "24/7", label: "Support" }
  ];

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background with Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-blue-50">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Enhanced Hero Section */}
        <motion.section
          ref={heroRef}
          variants={heroVariants}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          className="text-center max-w-6xl mx-auto mb-24"
        >
          {/* Enhanced Logo with Animation */}
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-12"
          >
            <div className="relative inline-block">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FileText className="w-24 h-24 text-primary mx-auto mb-6 drop-shadow-lg" />
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced Typography */}
          <motion.h1 
            className="text-hero font-display font-bold text-foreground mb-8 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            <span className="text-foreground">Resume Builder</span>
          </motion.h1>
          
          <motion.p 
            className="text-subtitle text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Create professional, ATS-friendly resumes that get you noticed. 
            <span className="font-semibold text-foreground"> Upload your existing resume or start fresh</span> - 
            our AI will help you craft the perfect resume.
          </motion.p>

          {/* Enhanced Resume Import Section */}
          <motion.section
            ref={uploadRef}
            variants={containerVariants}
            initial="hidden"
            animate={isUploadInView ? "visible" : "hidden"}
            className="mb-20"
          >
            <div
              className={`upload-area ${
                dragActive ? 'drag-active' : ''
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Reset the input value to allow re-selecting the same file
                    e.target.value = '';
                    handleFileUpload(file);
                  }
                }}
                className="hidden"
                multiple={false}
                style={{ display: 'none' }}
              />
              
              <motion.div
                animate={{ y: dragActive ? -8 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    y: dragActive ? -5 : 0,
                    scale: dragActive ? 1.1 : 1
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Upload className="w-20 h-20 text-primary mx-auto mb-6 drop-shadow-lg" />
                </motion.div>
                <h3 className="text-3xl font-display font-semibold mb-4 text-foreground">Import Your Existing Resume</h3>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto text-lg">
                  Drag & drop your PDF or Word document, or click to browse. 
                  Our AI will extract and optimize your information.
                  <span className="block text-sm mt-2 text-muted-foreground/80">
                    📱 Mobile-friendly: Tap the button below to select files from your device
                  </span>
                </p>
                <Button
                  type="button"
                  onClick={handleFileSelect}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleFileSelect();
                  }}
                  className="btn-upload group touch-manipulation"
                  disabled={isImporting}
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation'
                  }}
                >
                  {isImporting ? (
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  )}
                  {isImporting ? "Importing..." : "Choose File to Import"}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Enhanced Divider */}
          <motion.div 
            className="flex items-center justify-center mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <div className="px-8 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground font-medium">or start from scratch</span>
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </motion.div>
        </motion.section>

        {/* Enhanced User Path Selection */}
        <motion.section
          ref={pathRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isPathInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto mb-24"
        >
          <motion.h2 
            className="section-title"
            variants={staggerItem}
          >
            Choose Your Path
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Student Path */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -12 }}
              whileTap={{ scale: 0.98 }}
              className="path-card group"
              onClick={() => onSelectPath('student')}
            >
              <motion.div
                whileHover={{ rotate: 12, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 mb-6"
              >
                <GraduationCap className="w-16 h-16 md:w-24 md:h-24 text-primary mx-auto drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4 md:mb-6 text-foreground">I am a Student</h3>
              <p className="text-muted-foreground mb-6 md:mb-10 text-base md:text-lg leading-relaxed">
                Perfect for students, recent graduates, and those starting their careers. 
                Focus on education, projects, and potential.
              </p>
              <Button className="btn-hero w-full group">
                Get Started as Student
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Employee Path */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.02, y: -12 }}
              whileTap={{ scale: 0.98 }}
              className="path-card group"
              onClick={() => onSelectPath('employee')}
            >
              <motion.div
                whileHover={{ rotate: -12, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 mb-6"
              >
                <Briefcase className="w-16 h-16 md:w-24 md:h-24 text-primary mx-auto drop-shadow-lg" />
              </motion.div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4 md:mb-6 text-foreground">I am an Employee</h3>
              <p className="text-muted-foreground mb-6 md:mb-10 text-base md:text-lg leading-relaxed">
                Ideal for working professionals looking to advance their careers. 
                Highlight experience, achievements, and expertise.
              </p>
              <Button className="btn-hero w-full group">
                Get Started as Professional
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Features Section */}
        <motion.section
          ref={featuresRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.h2 
            className="section-title"
            variants={staggerItem}
          >
            Why Choose Our Resume Builder?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="feature-card group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-6"
                >
                  <feature.icon className="w-16 h-16 text-primary mx-auto drop-shadow-lg" />
                </motion.div>
                <h3 className="text-2xl font-display font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Calendar Demo Link */}
          {/* <motion.div
            variants={staggerItem}
            className="text-center mt-12"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group hover:bg-primary hover:text-white transition-all duration-300"
            >
              <a href="/calendar" className="flex items-center gap-2">
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Try Our Month/Year Picker Calendar
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div> */}
        </motion.section>

        {/* Enhanced Stats Section */}
        <motion.section
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="stat-card group"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-4"
                >
                  <stat.icon className="w-12 h-12 text-primary mx-auto drop-shadow-lg" />
                </motion.div>
                <div className="text-4xl font-bold text-foreground mb-2 font-display">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.p
            variants={staggerItem}
            className="text-sm text-muted-foreground mt-16 font-medium"
          >
            Trusted by thousands of job seekers worldwide • ATS Compatible • HR Approved • Industry Standard
          </motion.p>
        </motion.section>

        {/* Path Selection Overlay for Import */}
        {showPathSelection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            >
              <h2 className="text-3xl font-display font-bold text-center mb-2 text-foreground">
                Resume Imported Successfully! 🎉
              </h2>
              <p className="text-muted-foreground text-center mb-8 text-lg">
                Choose your profile type to continue building your resume
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Path */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="path-card cursor-pointer"
                  onClick={() => handlePathSelection('student')}
                >
                  <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">Student</h3>
                  <p className="text-muted-foreground text-sm">
                    Focus on education, projects, and potential
                  </p>
                </motion.div>

                {/* Employee Path */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="path-card cursor-pointer"
                  onClick={() => handlePathSelection('employee')}
                >
                  <Briefcase className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-semibold mb-2 text-foreground">Professional</h3>
                  <p className="text-muted-foreground text-sm">
                    Highlight experience and achievements
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      {/* <FloatingActionButton 
        onPrimaryClick={() => onSelectPath('student')}
        showScrollToTop={true}
      /> */}
    </div>
  );
};

export default LandingPage;