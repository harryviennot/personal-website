import React from "react";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
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
            About Me
          </h2>

          <div className="bg-gray-50 p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm a French software engineering student currently studying at
              McGill University, with a strong background from Epitech. My
              interests lie in system automation, DevOps, and building impactful
              digital tools. I enjoy working on challenging projects and believe
              in clean, efficient code backed by thoughtful design. I'm always
              eager to collaborate and learn from others.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
