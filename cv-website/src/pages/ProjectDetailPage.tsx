import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

// Define types for data that is not translated or fetched directly
interface ProjectTechStack {
  [key: string]: string[];
}
interface ProjectImages {
  [key: string]: string[];
}
interface ProjectGithubUrls {
  [key: string]: string;
}

const ProjectDetailPage: React.FC = () => {
  const { projectName: routeProjectName } = useParams<{
    projectName: string;
  }>();
  const { t } = useTranslation();

  if (!routeProjectName) {
    // Handle undefined routeProjectName, though router should prevent this
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {t("projectDetailPage.notFound.title")}
      </div>
    );
  }

  // Normalize slug for translation keys (e.g., "movie-match" to "movieMatch")
  const projectSlugForT = routeProjectName.replace(/-([a-z])/g, (g) =>
    g[1].toUpperCase()
  );

  const nameKey = `projects.${projectSlugForT}.name`;
  const name = t(nameKey);

  // Check if project exists by verifying the name translation
  if (name === nameKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("projectDetailPage.notFound.title")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("projectDetailPage.notFound.message")}
          </p>
          <Link
            to="/#projects"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("projectDetailPage.backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  const fullDescription = t(`projects.${projectSlugForT}.fullDescription`);
  const duration = t(`projects.${projectSlugForT}.duration`);

  // Non-translated data (could also be part of a larger config object)
  const allTechStacks: ProjectTechStack = {
    botbutler: [
      "React",
      "Node.js",
      "OpenAI API",
      "MongoDB",
      "AWS Lambda",
      "TypeScript",
    ],
    movieMatch: ["React Native", "Firebase", "TheMovieDB API", "Redux", "Expo"],
    mirage: ["Go", "React", "D3.js", "AWS CDK", "Docker"],
    switchecs: ["HTML", "CSS", "JavaScript"], // Example tech stack for switchecs
  };
  const techStack = allTechStacks[projectSlugForT] || [];

  const allGithubUrls: ProjectGithubUrls = {
    botbutler: "https://github.com/harryviennot/botbutler",
    movieMatch: "https://github.com/harryviennot/movie-match",
    mirage: "https://github.com/harryviennot/mirage",
    switchecs: "https://github.com/harryviennot/switchecs",
  };
  const githubUrl = allGithubUrls[projectSlugForT] || "#";

  const allImages: ProjectImages = {
    botbutler: ["/projects/botbutler-1.jpg", "/projects/botbutler-2.jpg"],
    movieMatch: ["/projects/moviematch-1.jpg", "/projects/moviematch-2.jpg"],
    mirage: ["/projects/mirage-1.jpg", "/projects/mirage-2.jpg"],
    // switchecs might not have images, or add them here
  };
  const images = allImages[projectSlugForT] || [];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-sm"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-6"
          >
            <svg
              className="mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {t("projectDetailPage.backToProjects")}
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>

          {duration && <p className="text-gray-500 mb-6">{duration}</p>}

          {techStack.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("projectDetailPage.techStackTitle")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t("projectDetailPage.descriptionTitle")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <Trans i18nKey={fullDescription} defaults={fullDescription}>
                {fullDescription}
              </Trans>
            </p>
          </div>

          {images && images.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("projectDetailPage.screenshotsTitle")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      src={image}
                      alt={t("projectDetailPage.screenshotAltText", {
                        projectName: name,
                        number: index + 1,
                      })}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t("projectDetailPage.linksTitle")}
            </h2>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {t("projectDetailPage.viewSourceGithub")}
            </a>
          </div>

          <Link
            to="/#projects"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("projectDetailPage.backToProjects")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
