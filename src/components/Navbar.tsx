import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Process", href: "/#process" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.svg" 
            alt="Climbird Logo" 
            className="w-12 h-12 rounded-xl group-hover:scale-110 transition-transform shadow-lg"
          />
          <span 
            className="text-2xl leading-none tracking-tight text-dark mt-1"
            style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 'bold' }}
          >
            Climbird
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-dark/70 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/#contact"
            className="bg-gradient-primary text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all text-sm"
          >
            Free Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-dark p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass absolute top-full left-0 right-0 border-t border-dark/10 p-6 flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-lg font-medium text-dark"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/#contact"
              className="bg-gradient-primary text-white text-center py-4 rounded-xl font-bold shadow-lg mt-2"
              onClick={() => setIsOpen(false)}
            >
              Get Free Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
