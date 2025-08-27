import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, User, Phone, Building, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
      // Log the form data before submission
      console.log("=== SIGNUP FORM DATA ===");
      console.log("Form Data Object:", formData);
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);
      console.log("First Name:", formData.firstName);
      console.log("Last Name:", formData.lastName);
      console.log("Phone:", formData.phone);
      console.log("Company:", formData.company);
      console.log("Terms Agreed:", formData.agreeToTerms);
      console.log("Newsletter:", formData.subscribeNewsletter);
      console.log("=========================");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful signup
      console.log("✅ Signup successful!");
      console.log("Final data being sent:", JSON.stringify(formData, null, 2));
      
      // Show success message with data
      alert(`Signup successful!\n\nData submitted:\nEmail: ${formData.email}\nName: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nCompany: ${formData.company}`);
      
    } catch (error) {
      console.error("❌ Signup failed:", error);
      setErrors({ general: "Signup failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, y: -2 },
    blur: { scale: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-white to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-blue-50">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground">
            Join thousands of professionals building better resumes
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-large border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{errors.general}</span>
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-foreground mb-2 block">
                  First Name
                </Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`pl-10 pr-4 py-3 border-2 transition-all duration-300 ${
                        errors.firstName ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                      }`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.firstName}</span>
                    </motion.p>
                  )}
                </motion.div>
              </div>

              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-foreground mb-2 block">
                  Last Name
                </Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                  whileBlur="blur"
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`pl-10 pr-4 py-3 border-2 transition-all duration-300 ${
                        errors.lastName ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                      }`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.lastName}</span>
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                Email Address
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 pr-4 py-3 border-2 transition-all duration-300 ${
                      errors.email ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="john.doe@company.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                Phone Number
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-10 pr-4 py-3 border-2 transition-all duration-300 ${
                      errors.phone ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company" className="text-sm font-medium text-foreground mb-2 block">
                Company (Optional)
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="pl-10 pr-4 py-3 border-2 border-border focus:border-primary transition-all duration-300"
                    placeholder="Your Company Name"
                  />
                </div>
              </motion.div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
                Password
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-12 py-3 border-2 transition-all duration-300 ${
                      errors.password ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password}</span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground mb-2 block">
                Confirm Password
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
                whileBlur="blur"
              >
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-10 pr-12 py-3 border-2 transition-all duration-300 ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-border focus:border-primary"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.confirmPassword}</span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-start space-x-3"
              >
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="agreeToTerms" className="text-sm text-foreground cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </Label>
                  {errors.agreeToTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.agreeToTerms}</span>
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-start space-x-3"
              >
                <Checkbox
                  id="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="subscribeNewsletter" className="text-sm text-foreground cursor-pointer">
                  Subscribe to our newsletter for resume tips and career advice
                </Label>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-hero group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
