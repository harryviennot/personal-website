import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t("about.title")}
          </h2>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              {t("about.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
