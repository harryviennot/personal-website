import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import DevOpsCycleAnimation from "./DevOpsCycleAnimation"; // Removed animation import

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - window.innerHeight / 4;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16 relative overflow-hidden">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center order-1 md:order-1"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src="/profile.jpeg"
                alt={t("hero.profileAlt")}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-2"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {t("hero.headline")}
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-500">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                href="/CVHarryViennotIT.pdf"
                download
                className="rounded-md bg-blue-600 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-md font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300"
              >
                {t("hero.downloadCV")}
              </motion.a>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => scrollToSection("contact")}
                className="rounded-md bg-gray-100 px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-md font-semibold text-gray-800 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300"
              >
                {t("hero.contactInfo")}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Removed Animation Speed Slider */}
      {/*
      <div className="absolute bottom-4 right-4 z-20 p-3 bg-white/30 backdrop-blur-sm rounded-lg shadow-md">
        <label
          htmlFor="speedSlider"
          className="block text-xs text-gray-700 mb-1"
        >
          Animation Speed: {animationSpeed.toFixed(1)}x
        </label>
        <input
          type="range"
          id="speedSlider"
          min="0.1"
          max="3"
          step="0.1"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>
      */}
    </section>
  );
};

export default HeroSection;
