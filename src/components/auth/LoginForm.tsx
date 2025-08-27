import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Zap, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
      
      // Handle successful login
      console.log("Login successful:", formData);
      
      // You can redirect here or show success message
      
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ general: "Invalid email or password. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  const inputVariants = {
    focus: { scale: 1.02, y: -2 },
    blur: { scale: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 }
  };

  const fillDummyData = () => {
    setFormData({
      email: "oneeb589@gmail.com",
      password: "oneeb54321",
      rememberMe: false
    });
    setErrors({}); // Clear any previous errors
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
              <Zap className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to continue building your professional resume
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
                    placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center space-x-3"
              >
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                />
                <Label htmlFor="rememberMe" className="text-sm text-foreground cursor-pointer">
                  Remember me
                </Label>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </motion.div>
            </div>

            {/* Dummy Data Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mb-4"
            >
              <Button
                type="button"
                variant="outline"
                onClick={fillDummyData}
                className="w-full text-sm"
              >
                🧪 Fill Test Data (oneeb589@gmail.com / oneeb54321)
              </Button>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
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
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="my-8 text-center"
        >
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            <span className="px-4 text-muted-foreground text-sm font-medium">or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
          </div>
        </motion.div>

        {/* Social Login Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="space-y-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("github")}
            className="w-full bg-white/80 backdrop-blur-sm border border-border/50 hover:bg-white hover:shadow-medium transition-all duration-300 group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Continue with GitHub
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin("linkedin")}
            className="w-full bg-white/80 backdrop-blur-sm border border-border/50 hover:bg-white hover:shadow-medium transition-all duration-300 group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Linkedin className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Continue with LinkedIn
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
