import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  
  const navbarBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.95)"]
  );
  
  const navbarShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0, 0, 0, 0)", "0 4px 20px rgba(0, 0, 0, 0.1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: navbarBg,
        boxShadow: navbarShadow,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <FileText className="w-8 h-8 text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-2 h-2 text-white" />
                </motion.div>
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-300 relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/login">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link to="/signup">
                <Button className="btn-hero">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { 
              opacity: 1, 
              height: "auto",
              transition: { duration: 0.3, ease: "easeOut" }
            },
            closed: { 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.3, ease: "easeIn" }
            }
          }}
        >
          <div className="py-4 space-y-4 border-t border-border/50">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="block text-foreground/80 hover:text-primary font-medium transition-colors duration-300 py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="pt-4 space-y-3 border-t border-border/50">
              <Link to="/login">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full btn-hero">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
