
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, User, Phone, Building, ArrowRight, CheckCircle, AlertCircle, Github, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();
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

    // Phone is optional, no validation needed

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
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
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        company: formData.company,
      });
      
      // Navigate to email verification page after successful signup
      navigate("/verify-email");
      
    } catch (error: any) {
      console.error("❌ Signup failed:", error);
      setErrors({ general: error.message || "Signup failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    setIsSubmitting(true);
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'github') {
        await signInWithGithub();
      }
      
      // Navigate to home page after successful social signup
      navigate("/");
    } catch (error: any) {
      console.error(`${provider} signup failed:`, error);
      setErrors({ general: error.message || `Failed to sign up with ${provider}` });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md lg:max-w-lg"
      >
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <motion.div
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Home className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium group-hover:underline">Back to Home</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2 max-w-sm mx-auto">
            Join thousands of professionals building better resumes
          </p>
        </motion.div>

        {/* Social Signup Buttons */}
        { <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3 sm:space-y-4 mb-6"
        >
          <motion.button
            type="button"
            onClick={() => handleSocialSignup("google")}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 group py-3 sm:py-4 rounded-xl font-medium shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm sm:text-base font-medium">Continue with Google</span>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => handleSocialSignup("github")}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 hover:border-gray-600 transition-all duration-300 group py-3 sm:py-4 rounded-xl font-medium shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <Github className="w-5 h-5" />
              <span className="text-sm sm:text-base font-medium">Continue with GitHub</span>
            </div>
          </motion.button>
        </motion.div> }

        {/* Divider */}
        { <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-6 sm:my-8 text-center"
        >
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">or sign up with email</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </motion.div> }

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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

          <div className="space-y-5 sm:space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  First Name
                </Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`pl-12 pr-4 py-4 text-base border-2 transition-all duration-300 rounded-xl ${
                        errors.firstName ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.firstName}</span>
                    </motion.p>
                  )}
                </motion.div>
              </div>

              <div>
                <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Last Name
                </Label>
                <motion.div
                  variants={inputVariants}
                  whileFocus="focus"
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`pl-12 pr-4 py-4 text-base border-2 transition-all duration-300 rounded-xl ${
                        errors.lastName ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center space-x-1"
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
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2 block">
                Email Address
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-12 pr-4 py-4 text-base border-2 transition-all duration-300 rounded-xl ${
                      errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    placeholder="john.doe@company.com"
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                Phone Number
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`pl-12 pr-4 py-4 text-base border-2 transition-all duration-300 rounded-xl ${
                      errors.phone ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company" className="text-sm font-semibold text-gray-700 mb-2 block">
                Company (Optional)
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="pl-12 pr-4 py-4 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 rounded-xl"
                    placeholder="Your Company Name"
                  />
                </div>
              </motion.div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2 block">
                Password
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-12 pr-12 py-4 text-base border-2 transition-all duration-300 rounded-xl ${
                      errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password}</span>
                  </motion.p>
                )}
              </motion.div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 mb-2 block">
                Confirm Password
              </Label>
              <motion.div
                variants={inputVariants}
                whileFocus="focus"
              >
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`pl-12 pr-12 py-4 text-base border-2 transition-all duration-300 rounded-xl ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
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
                  <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      Privacy Policy
                    </a>
                  </Label>
                  {errors.agreeToTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center space-x-1"
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
                <Label htmlFor="subscribeNewsletter" className="text-sm text-gray-700 cursor-pointer">
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
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-create-account"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="btn-text">
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center mt-6 sm:mt-8"
        >
          <p className="text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;