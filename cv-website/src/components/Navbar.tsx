import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/" || location.pathname === "/home";

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

  const navigateToSection = (sectionId: string) => {
    // If already on home page, just scroll
    if (isHomePage) {
      scrollToSection(sectionId);
    } else {
      // If on another page, navigate to home and then scroll after a delay
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 400);
    }

    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

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

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
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
              onClick={handleLogoClick}
              className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              {t("navbar.brand")}
            </button>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <button
                onClick={() => navigateToSection("about")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                {t("navbar.about")}
              </button>
              <button
                onClick={() => navigateToSection("experience")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                {t("navbar.experience")}
              </button>
              <button
                onClick={() => navigateToSection("projects")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                {t("navbar.projects")}
              </button>
              <button
                onClick={() => navigateToSection("contact")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                {t("navbar.contact")}
              </button>
              <a
                href="https://github.com/harryviennot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                {t("navbar.github")}
              </a>
              <a
                href="https://linkedin.com/in/harry-viennot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2"
              >
                {t("navbar.linkedin")}
              </a>
              <LanguageSwitcher />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <div className="mr-2">
              <LanguageSwitcher />
            </div>
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

      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <button
            onClick={() => navigateToSection("about")}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            {t("navbar.about")}
          </button>
          <button
            onClick={() => navigateToSection("experience")}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            {t("navbar.experience")}
          </button>
          <button
            onClick={() => navigateToSection("projects")}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            {t("navbar.projects")}
          </button>
          <button
            onClick={() => navigateToSection("contact")}
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            {t("navbar.contact")}
          </button>
          <a
            href="https://github.com/harryviennot"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            {t("navbar.github")}
          </a>
          <a
            href="https://linkedin.com/in/harry-viennot"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-gray-800 hover:text-gray-600 transition-colors duration-300 px-3 py-2 w-full text-left"
          >
            {t("navbar.linkedin")}
          </a>
          <div className="px-3 py-2">
            <LanguageSwitcher isMobile={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
