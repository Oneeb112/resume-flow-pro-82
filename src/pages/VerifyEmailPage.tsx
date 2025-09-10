import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VerifyEmailPage = () => {
  const { currentUser, sendVerificationEmail, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleResendVerification = async () => {
    if (!currentUser) return;

    setIsResending(true);
    try {
      await sendVerificationEmail();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification email",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!currentUser) return;

    setIsChecking(true);
    try {
      await refreshUserProfile();
      await currentUser.reload();
      
      if (currentUser.emailVerified) {
        toast({
          title: "Email Verified!",
          description: "Your email has been successfully verified.",
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Not Verified Yet",
          description: "Please check your email and click the verification link.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to check verification status",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSkip = () => {
    navigate(from, { replace: true });
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
        className="relative z-10 w-full max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg mx-auto mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl font-display font-bold text-foreground mb-4"
        >
          Verify Your Email
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted-foreground mb-8 text-lg"
        >
          We've sent a verification link to{" "}
          <strong className="text-foreground">{currentUser?.email}</strong>.
          Please check your email and click the link to verify your account.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="space-y-4"
        >
          <Button
            onClick={handleCheckVerification}
            disabled={isChecking}
            className="w-full btn-hero group"
          >
            {isChecking ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                Checking...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                I've Verified My Email
              </>
            )}
          </Button>

          <Button
            onClick={handleResendVerification}
            disabled={isResending}
            variant="outline"
            className="w-full"
          >
            {isResending ? (
              <>
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Verification Email
              </>
            )}
          </Button>

          {/* <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Skip for Now
          </Button> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm text-blue-800 font-medium mb-1">
                Didn't receive the email?
              </p>
              <p className="text-xs text-blue-600">
                Check your spam folder or try resending the verification email.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
