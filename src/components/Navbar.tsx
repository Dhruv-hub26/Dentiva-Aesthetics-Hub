"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Calendar, Phone } from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "specializations", label: "Specializations" },
    { id: "discounts", label: "Membership Plan" },
    { id: "testimonials", label: "Reviews" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#202A2C]/90 backdrop-blur-md border-b border-white/10 ${scrolled ? "py-4 shadow-md" : "py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-mint-aqua group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-heading text-pure-white">
                DENTIVA
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-mint-aqua/70 -mt-1 font-semibold">
                Aesthetics
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${activeSection === item.id
                    ? "text-mint-aqua"
                    : "text-graphite-slate hover:text-pure-white"
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint-aqua rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-sm font-medium text-graphite-slate hover:text-pure-white transition-colors"
            >
              <Phone className="w-4 h-4 text-mint-aqua" />
              <span>+91 XXXXX XXXXX</span>
            </a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookClick}
              className="flex items-center gap-2 bg-mint-aqua hover:bg-mint-aqua/90 text-primary-dark px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide shadow-md transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-pure-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-[#202A2C]/95 backdrop-blur-md z-40 px-6 py-8 flex flex-col justify-between border-t border-white/10 md:hidden text-pure-white"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-2xl font-semibold tracking-tight py-2 ${activeSection === item.id
                      ? "text-mint-aqua"
                      : "text-graphite-slate"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <span className="w-2.5 h-2.5 rounded-full bg-mint-aqua" />
                    )}
                  </div>
                </button>
              ))}
            </nav>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-3 text-lg font-medium text-graphite-slate py-3 border border-white/10 rounded-xl"
              >
                <Phone className="w-5 h-5 text-mint-aqua" />
                <span>Call +91 98765 43210</span>
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="flex items-center justify-center gap-3 bg-mint-aqua text-primary-dark text-lg font-bold py-4 rounded-xl shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
