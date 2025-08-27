import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Target, 
  Award, 
  Heart, 
  Globe, 
  Zap, 
  Shield, 
  Lightbulb,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  FileText,
  Building,
  Clock,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isMissionInView = useInView(missionRef, { once: true });
  const isStoryInView = useInView(storyRef, { once: true });
  const isTeamInView = useInView(teamRef, { once: true });
  const isValuesInView = useInView(valuesRef, { once: true });
  const isCtaInView = useInView(ctaRef, { once: true });

  const values = [
    {
      icon: Heart,
      title: "User-Centric",
      description: "Everything we do is centered around making our users' lives easier and helping them succeed in their careers."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We prioritize the security and privacy of our users' data with enterprise-grade protection measures."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with AI and technology to deliver better results."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making professional resume building accessible to everyone, regardless of their background or experience level."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "sarah-johnson",
      bio: "Former HR executive with 15+ years of experience in talent acquisition and career development."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "michael-chen",
      bio: "AI/ML expert with a background in natural language processing and resume optimization."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "emily-rodriguez",
      bio: "Award-winning designer focused on creating intuitive and beautiful user experiences."
    },
    {
      name: "David Kim",
      role: "Head of Product",
      image: "david-kim",
      bio: "Product strategist with expertise in career technology and user growth."
    }
  ];

  const milestones = [
    { year: "2020", title: "Company Founded", description: "ResumeAI was born from a simple idea: making resume building accessible to everyone." },
    { year: "2021", title: "First 1K Users", description: "Reached our first milestone of 1,000 active users within 6 months of launch." },
    { year: "2022", title: "AI Integration", description: "Launched our revolutionary AI-powered resume optimization and ATS scoring system." },
    { year: "2023", title: "50K+ Users", description: "Grew to serve over 50,000 professionals across 120+ countries." },
    { year: "2024", title: "Industry Leader", description: "Recognized as the leading AI-powered resume builder in the market." }
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
                  <Building className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6"
              >
                About{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  ResumeAI
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                We're on a mission to democratize professional success by making it easier for everyone to create compelling resumes that get them hired.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/features">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Explore Features
                  </Button>
                </Link>
                <Button variant="outline" className="text-lg px-8 py-4">
                  Join Our Team
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-display font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  We believe that everyone deserves the opportunity to present themselves professionally and land their dream job. Our AI-powered platform removes the barriers that prevent talented individuals from showcasing their skills effectively.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  By combining cutting-edge technology with human-centered design, we're transforming how people approach their careers and helping them achieve their professional goals.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">50K+</div>
                    <div className="text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-display font-bold text-primary mb-2">95%</div>
                    <div className="text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-primary-light to-purple-100 rounded-2xl p-8 shadow-large">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">Clear Vision</h3>
                      <p className="text-sm text-muted-foreground">Making career success accessible to everyone</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">Fast Execution</h3>
                      <p className="text-sm text-muted-foreground">Rapid innovation and continuous improvement</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">User Focus</h3>
                      <p className="text-sm text-muted-foreground">Everything we do centers around user success</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">Excellence</h3>
                      <p className="text-sm text-muted-foreground">Striving for the highest quality in everything</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section ref={storyRef} className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isStoryInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Journey
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From a simple idea to a revolutionary platform that's transforming how people approach their careers and achieve their professional dreams.
              </p>
            </motion.div>

            {/* Enhanced Story Timeline */}
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-gradient-to-b from-primary via-purple-500 to-blue-500"></div>
                
                <div className="space-y-16">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      {/* Content */}
                      <div className={`flex-1 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{milestone.year}</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-foreground">
                              {milestone.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {milestone.description}
                          </p>
                        </motion.div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-primary rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
                      </div>
                      
                      {/* Spacer */}
                      <div className="flex-1"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-20"
            >
              <div className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold mb-4">
                    The Future is Bright
                  </h3>
                  <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                    As we continue to grow and innovate, our commitment remains unwavering: to empower every professional with the tools they need to succeed. We're not just building resumes—we're building careers, dreams, and futures.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/features">
                      <Button className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        Explore Our Platform
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300"
                    >
                      Join Our Mission
                      <Users className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and shape our company culture.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals behind ResumeAI who are dedicated to helping you succeed.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-large border border-border/50 text-center hover:shadow-ultra transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-light to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <div className="text-primary font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
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
                Join Us on This Journey
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Be part of the revolution that's changing how people approach their careers and professional development.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
