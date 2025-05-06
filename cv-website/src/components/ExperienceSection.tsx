import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        Read More
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
  const experiences = [
    {
      title: "DevOps Intern",
      company: "BPCE IT",
      slug: "bpce",
      date: "Oct 2023 – June 2024",
      description:
        "Worked on automating CI/CD pipelines and deploying infrastructure with Kubernetes. Participated in internal tooling enhancements and improved system performance monitoring.",
    },
    {
      title: "Software Development Intern",
      company: "Strategin",
      slug: "strategin",
      date: "June 2023 – Sept 2023",
      description:
        "Developed full-stack features for client applications using React and Node.js. Collaborated with design and product teams to implement responsive UI components.",
    },
    {
      title: "Hackathon",
      company: "Airbus Innovation Week",
      slug: "airbus-hackathon",
      date: "March 2023",
      description:
        "Participated in a 48-hour hackathon focused on sustainable aviation solutions. Developed a prototype for reducing carbon emissions through optimized flight planning.",
      isExtra: true,
    },
  ];

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
            Work Experience
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
