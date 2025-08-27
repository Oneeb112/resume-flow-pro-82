import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

interface FloatingActionButtonProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showScrollToTop?: boolean;
}

const FloatingActionButton = ({ 
  onPrimaryClick, 
  onSecondaryClick, 
  showScrollToTop = true 
}: FloatingActionButtonProps) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Primary FAB */}
      {onPrimaryClick && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.5
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={onPrimaryClick}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-hover shadow-ultra hover:shadow-glow transition-all duration-300"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* Secondary FAB (Scroll to top) */}
      {showScrollToTop && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: showScrollButton ? 1 : 0, 
            opacity: showScrollButton ? 1 : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={scrollToTop}
            variant="outline"
            className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-border/50 shadow-medium hover:shadow-large transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FloatingActionButton;
