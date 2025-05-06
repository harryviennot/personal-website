import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ExperienceCardProps {
  title: string;
  company: string;
  slug: string;
  date: string;
  description: string;
  isExtra?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  slug,
  date,
  description,
  isExtra = false,
}) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl shadow-sm ${
        isExtra ? "bg-blue-50 border border-blue-100" : "bg-gray-50"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-900">
        {title} – {company}
      </h3>
      <p className="text-gray-500 mb-3">{date}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link
        to={`/experience/${slug}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        {t("experience.readMore")}
        <svg
          className="ml-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();

  const experienceSlugs = ["bpce", "strategin", "airbusHackathon"];
  const experiences = experienceSlugs.map((slug) => ({
    slug: slug,
    title: t(`experience.${slug}.title`),
    company: t(`experience.${slug}.company`),
    date: t(`experience.${slug}.date`),
    description: t(`experience.${slug}.description`),
    isExtra: slug === "airbusHackathon",
  }));

  return (
    <section id="experience" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t("experience.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                title={exp.title}
                company={exp.company}
                slug={exp.slug}
                date={exp.date}
                description={exp.description}
                isExtra={exp.isExtra}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
