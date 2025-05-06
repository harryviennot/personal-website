import React from "react";
import { motion } from "framer-motion";

interface EducationCardProps {
  institution: string;
  degree: string;
  year: string;
  description: string;
}

const EducationCard: React.FC<EducationCardProps> = ({
  institution,
  degree,
  year,
  description,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h3 className="text-xl font-semibold text-gray-900">{institution}</h3>
      <p className="text-blue-600 font-medium">{degree}</p>
      <p className="text-gray-500 mb-3">{year}</p>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

const EducationSection: React.FC = () => {
  const educations = [
    {
      institution: "McGill University",
      degree: "Certificate in Management",
      year: "2024–2025",
      description:
        "Exchange year focusing on strategic management and international business.",
    },
    {
      institution: "Epitech – European Institute of Technology",
      degree: "Master's in Software Engineering",
      year: "2021–2026",
      description:
        "Project-based learning with emphasis on collaboration, algorithms, systems, and software architecture.",
    },
  ];

  return (
    <section id="education" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educations.map((edu, index) => (
              <EducationCard
                key={index}
                institution={edu.institution}
                degree={edu.degree}
                year={edu.year}
                description={edu.description}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
