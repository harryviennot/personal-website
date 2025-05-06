import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the position of the element
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      // Calculate the middle of the viewport
      const offsetPosition = elementPosition - window.innerHeight / 4;

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => window.scrollTo(0, 0)}
              className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              Harry Viennot
            </button>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                About Me
              </button>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                Contact
              </button>
              <a
                href="https://github.com/harryviennot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/harryviennot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="md:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 hover:text-gray-600 p-2"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <button
            onClick={() => {
              scrollToSection("about");
              setIsMobileMenuOpen(false);
            }}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            About Me
          </button>
          <button
            onClick={() => {
              scrollToSection("experience");
              setIsMobileMenuOpen(false);
            }}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            Experience
          </button>
          <button
            onClick={() => {
              scrollToSection("projects");
              setIsMobileMenuOpen(false);
            }}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            Projects
          </button>
          <button
            onClick={() => {
              scrollToSection("contact");
              setIsMobileMenuOpen(false);
            }}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            Contact
          </button>
          <a
            href="https://github.com/harryviennot"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/harryviennot"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
