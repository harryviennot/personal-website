import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Define types for the updated JSON structure
interface Screenshot {
  url: string;
  caption: string;
}

interface AppInfo {
  summary: string;
  screenshots: Screenshot[];
}

interface DesignInfo {
  description: string;
  figma: string | null;
}

interface ArchitectureInfo {
  text: string;
  diagram: string | null;
}

interface StackInfo {
  frontend: string[];
  backend: string[];
  apis: string[];
  libraries: string[];
  tools: string[];
  devops: string[];
  ai: string[];
}

interface ProjectData {
  name: string;
  duration: string;
  github: string | null;
  overview: string;
  context: string;
  app: AppInfo;
  design: DesignInfo;
  stack: StackInfo;
  architecture: ArchitectureInfo;
  challenges: string[];
}

const ProjectDetailPage: React.FC = () => {
  const { projectName: routeProjectName } = useParams<{
    projectName: string;
  }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Improved scroll behavior for smoother experience that centers the section
  const scrollToSection = (sectionId: string) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "center", // Centers the element in the viewport
        });
      }
    }, 300); // Increased delay for more reliable scrolling
  };

  const handleBackToProjects = () => {
    scrollToSection("projects");
  };

  if (!routeProjectName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {t("projectDetailPage.notFound.title")}
      </div>
    );
  }

  // Normalize slug for translation keys (e.g., "movie-match" to "moviematch")
  const projectSlugForT = routeProjectName.replace(/-([a-z])/g, (g) =>
    g[1].toUpperCase()
  );

  const projectData = t(`projects.${projectSlugForT}`, {
    returnObjects: true,
  }) as ProjectData;
  const name = projectData.name;

  // Check if project exists
  if (
    name === `projects.${projectSlugForT}.name` ||
    typeof projectData === "string"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("projectDetailPage.notFound.title")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("projectDetailPage.notFound.message")}
          </p>
          <button
            onClick={handleBackToProjects}
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("projectDetailPage.backToProjects")}
          </button>
        </div>
      </div>
    );
  }

  // Destructure for easier access
  const {
    duration,
    github,
    overview,
    context,
    app,
    design,
    stack,
    architecture,
    challenges,
  } = projectData;

  // Helper function to render a list of strings
  const renderList = (items: string[] | undefined, title: string) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{title}</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {items.map((item, index) => (
            <li key={index} className="pl-1">
              <span className="pl-2">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Helper function to render tech stack categories
  const renderTechCategory = (
    items: string[] | undefined,
    categoryTitle: string
  ) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-800 mb-2">
          {categoryTitle}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow-sm"
        >
          <button
            onClick={handleBackToProjects}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-6 cursor-pointer bg-transparent border-none"
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
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          {duration && <p className="text-gray-500 mb-6">{duration}</p>}

          {/* Overview Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t("projectDetailPage.descriptionTitle")}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{overview}</p>

            {context && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700 leading-relaxed">{context}</p>
              </div>
            )}
          </div>

          {/* App Summary Section */}
          {app && app.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("projectDetailPage.overviewTitle")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {app.summary}
              </p>
            </div>
          )}

          {/* Tech Stack Section */}
          {stack && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("projectDetailPage.techStackTitle")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {renderTechCategory(stack.frontend, t("Frontend"))}
                  {renderTechCategory(stack.backend, t("Backend"))}
                  {renderTechCategory(stack.apis, t("APIs"))}
                </div>
                <div>
                  {renderTechCategory(stack.libraries, t("Libraries"))}
                  {renderTechCategory(stack.devops, t("DevOps"))}
                  {renderTechCategory(stack.tools, t("Tools"))}
                  {renderTechCategory(stack.ai, t("AI"))}
                </div>
              </div>
            </div>
          )}

          {/* Design Section */}
          {design && design.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("Design Process")}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-2">
                {design.description}
              </p>
              {design.figma && (
                <a
                  href={design.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-300 inline-flex items-center mt-2"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.52 11.998c0-1.79 1.457-3.24 3.255-3.24 1.798 0 3.254 1.45 3.254 3.24 0 1.79-1.456 3.24-3.254 3.24-1.798 0-3.254-1.45-3.254-3.24zm-7.015-6.48c0-1.79 1.455-3.24 3.254-3.24h3.254v6.48H11.76c-1.799 0-3.254-1.45-3.254-3.24zm0 12.96c0-1.79 1.455-3.24 3.254-3.24h3.254v3.24c0 1.79-1.456 3.24-3.254 3.24-1.799 0-3.254-1.45-3.254-3.24zm-7.014-6.48c0-1.79 1.455-3.24 3.254-3.24h3.254v6.48H4.775c-1.799 0-3.254-1.45-3.254-3.24zm7.014-6.48c0-1.79 1.455-3.24 3.254-3.24h3.254v6.48H11.76c-1.799 0-3.254-1.45-3.254-3.24z" />
                  </svg>
                  Figma Design
                </a>
              )}
            </div>
          )}

          {/* Architecture Section */}
          {architecture && architecture.text && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("Architecture")}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {architecture.text}
              </p>
              {architecture.diagram && (
                <div className="mt-4">
                  <img
                    src={architecture.diagram}
                    alt="Architecture diagram"
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          )}

          {/* Challenges Section */}
          {renderList(challenges, t("Challenges"))}

          {/* Screenshots Section */}
          {app && app.screenshots && app.screenshots.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t("projectDetailPage.screenshotsTitle")}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {app.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={screenshot.url}
                      alt={t("projectDetailPage.screenshotAltText", {
                        projectName: name,
                        number: index + 1,
                      })}
                      className="w-full h-auto object-cover"
                    />
                    {screenshot.caption && (
                      <div className="p-3 bg-gray-50 text-sm text-gray-700">
                        {screenshot.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links Section */}
          {github && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("projectDetailPage.linksTitle")}
              </h2>
              <div className="flex flex-wrap gap-3">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors duration-300"
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
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
