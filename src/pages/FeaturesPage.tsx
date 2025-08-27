import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Zap, 
  Target, 
  Shield, 
  Download, 
  Eye, 
  Palette, 
  Search,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Clock,
  Globe,
  Lock,
  BarChart3,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FeaturesPage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const templatesRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isTemplatesInView = useInView(templatesRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });
  const isCtaInView = useInView(ctaRef, { once: true });

  const features = [
    {
      icon: Target,
      title: "ATS Optimization",
      description: "Our AI ensures your resume passes through Applicant Tracking Systems with keyword optimization and proper formatting.",
      benefits: ["Keyword matching", "Format compatibility", "ATS scoring", "Industry optimization"]
    },
    {
      icon: Palette,
      title: "Professional Templates",
      description: "Choose from 50+ professionally designed templates that suit your industry and experience level.",
      benefits: ["Modern designs", "Industry-specific", "Customizable colors", "Print-ready"]
    },
    {
      icon: Search,
      title: "Smart Content Analysis",
      description: "AI-powered content analysis that suggests improvements and highlights areas for enhancement.",
      benefits: ["Content scoring", "Improvement suggestions", "Grammar checking", "Style recommendations"]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is protected with enterprise-grade security and privacy controls.",
      benefits: ["End-to-end encryption", "GDPR compliant", "Data privacy", "Secure storage"]
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Export your resume in PDF, Word, or plain text formats for maximum compatibility.",
      benefits: ["PDF format", "Word document", "Plain text", "Custom sizing"]
    },
    {
      icon: Eye,
      title: "Real-time Preview",
      description: "See changes instantly with our real-time preview feature as you edit your resume.",
      benefits: ["Live preview", "Instant updates", "Mobile responsive", "Print preview"]
    }
  ];

  const templates = [
    {
      name: "Modern Professional",
      category: "Business",
      image: "modern-professional",
      popular: true
    },
    {
      name: "Creative Designer",
      category: "Creative",
      image: "creative-designer",
      popular: false
    },
    {
      name: "Minimalist Clean",
      category: "Technology",
      image: "minimalist-clean",
      popular: true
    },
    {
      name: "Executive Suite",
      category: "Executive",
      image: "executive-suite",
      popular: false
    },
    {
      name: "Academic Scholar",
      category: "Education",
      image: "academic-scholar",
      popular: false
    },
    {
      name: "Startup Founder",
      category: "Entrepreneur",
      image: "startup-founder",
      popular: true
    }
  ];

  const stats = [
    { icon: Users, number: "50K+", label: "Active Users" },
    { icon: TrendingUp, number: "95%", label: "ATS Success Rate" },
    { icon: Award, number: "4.9/5", label: "User Rating" },
    { icon: Clock, number: "2min", label: "Resume Creation" }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-blue-50">
            <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isHeroInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6"
              >
                Powerful Features for{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Professional Success
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Discover the advanced tools and intelligent features that make ResumeAI the ultimate choice for creating winning resumes that get you hired.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/signup">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Start Building Now
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-4">
                  View Templates
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section ref={featuresRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive feature set is designed to give you every advantage in your job search.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-large border border-border/50 hover:shadow-ultra transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isFeaturesInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (benefitIndex * 0.05) }}
                        className="flex items-center space-x-3 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section ref={templatesRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Professional Templates
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose from our curated collection of professional templates designed for every industry and career stage.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isTemplatesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-large border border-border/50 hover:shadow-ultra transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-light to-purple-100 flex items-center justify-center relative">
                    <FileText className="w-16 h-16 text-primary/60" />
                    {template.popular && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-display font-semibold text-foreground">
                        {template.name}
                      </h3>
                      <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                        {template.category}
                      </span>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      Use Template
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join the growing community of professionals who trust ResumeAI for their career success.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-display font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-20 bg-gradient-to-br from-primary to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of professionals who have already discovered the power of AI-driven resume building.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                    Get Started Free
                  </Button>
                </Link>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default FeaturesPage;
