import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful submission
      setIsSubmitted(true);
      
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
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
            Check Your Email
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-muted-foreground mb-8 text-lg"
          >
            We've sent a password reset link to <strong>{email}</strong>. 
            Please check your email and click the link to reset your password.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="space-y-4"
          >
            <Link to="/login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              Didn't receive the email?{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:underline font-medium"
              >
                Try again
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

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
              <Mail className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Forgot Password?
          </h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
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
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </motion.div>
          )}

          <div className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 border-2 border-border focus:border-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="john.doe@company.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-hero group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Sending Reset Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowLeft className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform rotate-180" />
                </>
              )}
            </Button>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            to="/login"
            className="text-primary hover:underline font-medium flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
