import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Users,
  FileText,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isContactInView = useInView(contactRef, { once: true });
  const isInfoInView = useInView(infoRef, { once: true });
  const isFormInView = useInView(formRef, { once: true });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@resumeai.com",
      description: "Send us an email anytime and we'll get back to you within 24 hours.",
      action: "mailto:hello@resumeai.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak directly with our support team during business hours.",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "San Francisco, CA",
      description: "Our headquarters in the heart of Silicon Valley.",
      action: "#"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri 9AM-6PM PST",
      description: "We're here to help during standard business hours.",
      action: "#"
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Globe, href: "#", label: "Website" }
  ];

  const faqs = [
    {
      question: "How does ResumeAI's AI optimization work?",
      answer: "Our AI analyzes your resume content and compares it against industry standards and job requirements to suggest improvements for better ATS compatibility and readability."
    },
    {
      question: "What file formats can I export my resume in?",
      answer: "You can export your resume in PDF, Word (.docx), and plain text formats. PDF is recommended for online applications, while Word format is great for further editing."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely! We use enterprise-grade encryption and follow strict privacy policies. Your data is never shared with third parties and is protected with industry-standard security measures."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! We provide 24/7 email support and live chat during business hours. Our team is always ready to help you with any questions or issues."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful submission
      setIsSubmitted(true);
      
    } catch (error) {
      console.error("Contact form failed:", error);
      setErrors({ general: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-blue-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-blue-50">
            <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl font-display font-bold text-foreground mb-4"
            >
              Message Sent Successfully!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-muted-foreground mb-8 text-lg"
            >
              Thank you for reaching out! We've received your message and will get back to you within 24 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="space-y-4"
            >
              <Button
                onClick={() => setIsSubmitted(false)}
                className="btn-hero w-full"
              >
                Send Another Message
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = "/"}
                className="w-full"
              >
                Back to Home
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

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
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6"
              >
                Get in{" "}
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Touch
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Have questions, feedback, or need support? We'd love to hear from you. Our team is here to help you succeed.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section ref={infoRef} className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">
                Multiple Ways to Reach Us
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the method that works best for you. We're here to help with any questions or support you need.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-large border border-border/50 text-center hover:shadow-ultra transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {info.title}
                  </h3>
                  
                  <div className="text-primary font-medium mb-3">
                    {info.details}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {info.description}
                  </p>

                  <a
                    href={info.action}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Contact Now
                    <Zap className="w-4 h-4 ml-2" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section ref={contactRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: -50 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.general && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{errors.general}</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`border-2 transition-all duration-300 ${
                          errors.name ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`border-2 transition-all duration-300 ${
                          errors.email ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                        }`}
                        placeholder="john.doe@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-foreground mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={`border-2 transition-all duration-300 ${
                        errors.subject ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                      }`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className={`min-h-[120px] border-2 transition-all duration-300 ${
                        errors.message ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-hero w-full group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground mb-8">
                  Find quick answers to common questions about ResumeAI.
                </p>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                      className="bg-white rounded-xl p-6 shadow-medium border border-border/50"
                    >
                      <h3 className="font-display font-semibold text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isFormInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                        className="w-12 h-12 bg-white rounded-xl border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
