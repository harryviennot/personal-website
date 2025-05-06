import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  name: string;
  slug: string;
  description: string;
  githubUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  slug,
  description,
  githubUrl,
}) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-gray-700 my-4">{description}</p>
      <div className="flex space-x-4">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-300"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          {t("navbar.github")}
        </a>
        <Link
          to={`/projects/${slug}`}
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
      </div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();

  const projectSlugs = ["mirage", "movieMatch", "botbutler", "switchecs"];
  const projects = projectSlugs.map((slug) => ({
    slug: slug,
    name: t(`projects.${slug}.name`),
    description: t(`projects.${slug}.description`),
    githubUrl: `https://github.com/harryviennot/${
      slug === "movieMatch" ? "movie-match" : slug
    }`,
  }));

  const movieMatchProject = projects.find((p) => p.slug === "movieMatch");
  if (movieMatchProject) {
    movieMatchProject.githubUrl = "https://github.com/harryviennot/movie-match";
  }

  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t("projects.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                name={project.name}
                slug={project.slug}
                description={project.description}
                githubUrl={project.githubUrl}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
