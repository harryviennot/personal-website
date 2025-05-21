import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

// Import components
import ToolsCarousel from "../components/experience/ToolsCarousel";
import ExperienceProjectsSection from "../components/experience/ExperienceProjectsSection";
import experienceToolsMap from "../components/experience/ExperienceTools";
import { Project } from "../components/experience/ProjectDetails";
import SimplePDFViewer from "../components/SimplePDFViewer";

// PDF paths
const INTERNSHIP_REPORTS = {
  bpce: "/reports/bpce-internship-report.pdf",
  strategin: "/reports/strategin-internship-report.pdf",
};

const ExperienceDetailPage: React.FC = () => {
  const { experienceName } = useParams<{ experienceName: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // State to track expanded projects
  const [expandedProjects, setExpandedProjects] = useState<{
    [key: number]: boolean;
  }>({ 0: true }); // First project expanded by default

  // State to track if PDF viewer is open
  const [showPDFViewer, setShowPDFViewer] = useState(false);

  // Toggle project expansion
  const toggleProject = (index: number) => {
    setExpandedProjects((prev) => {
      // Create a new object with all projects collapsed (set to false)
      const newState = {};
      // Then toggle the clicked project
      return {
        ...newState,
        [index]: !prev[index],
      };
    });
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fisher-Yates shuffle algorithm - memoize the function to use it in dependencies
  const shuffleArray = useMemo(() => {
    return <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
  }, []);

  // Get the current experience's tools or an empty array if none
  const experienceTools = useMemo(() => {
    if (!experienceName) return [];
    return experienceToolsMap[experienceName] || [];
  }, [experienceName]);

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
    }, 400); // Increased delay for more reliable scrolling
  };

  const handleBackToExperience = () => {
    scrollToSection("experience");
  };

  // Toggle PDF viewer
  const togglePDFViewer = () => {
    const wasShowing = showPDFViewer;
    setShowPDFViewer(!showPDFViewer);

    // If opening the viewer, scroll to it after animation completes
    if (!wasShowing) {
      setTimeout(() => {
        const pdfSection = document.getElementById("pdf-viewer");
        if (pdfSection) {
          pdfSection.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    }
  };

  if (!experienceName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("experienceDetailPage.notFound.title")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("experienceDetailPage.notFound.message")}
          </p>
          <button
            onClick={handleBackToExperience}
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("experienceDetailPage.backToExperience")}
          </button>
        </div>
      </div>
    );
  }

  const validExperienceName = experienceName;

  const titleKey = `experience.${validExperienceName}.title`;
  const title = t(titleKey);

  // Check if the experience data exists by verifying a core translated string (e.g., title)
  if (title === titleKey) {
    // i18next returns the key if translation is missing
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("experienceDetailPage.notFound.title")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("experienceDetailPage.notFound.message")}
          </p>
          <button
            onClick={handleBackToExperience}
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("experienceDetailPage.backToExperience")}
          </button>
        </div>
      </div>
    );
  }

  const company = t(`experience.${validExperienceName}.company`);
  const date = t(`experience.${validExperienceName}.date`);

  // For fullDescription, check if it exists in the translation
  const fullDescriptionKey = `experience.${validExperienceName}.fullDescription`;
  const fullDescription = t(fullDescriptionKey);
  const hasFullDescription = fullDescription !== fullDescriptionKey;

  // For context, check if it exists in the translation
  const contextKey = `experience.${validExperienceName}.context`;
  const context = t(contextKey);
  const hasContext = context !== contextKey;

  // Get projects if they exist
  const projectsKey = `experience.${validExperienceName}.projects`;
  const projectsData = t(projectsKey, { returnObjects: true });
  let projects: Project[] = [];

  if (Array.isArray(projectsData)) {
    projects = projectsData as Project[];
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-4 sm:p-8 rounded-xl shadow-sm"
        >
          <button
            onClick={handleBackToExperience}
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
            {t("experienceDetailPage.backToExperience")}
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <h2 className="text-xl text-blue-600 mb-2">{company}</h2>
          <p className="text-gray-500 mb-6">{date}</p>

          {(hasFullDescription || hasContext) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("experienceDetailPage.overviewTitle")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <Trans
                  i18nKey={hasContext ? contextKey : fullDescriptionKey}
                  defaults={hasContext ? context : fullDescription}
                >
                  {hasContext ? context : fullDescription}
                </Trans>
              </p>
            </div>
          )}
          {experienceTools.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("experienceDetailPage.toolsTitle")}
              </h3>
              <ToolsCarousel
                tools={experienceTools}
                shuffleArray={shuffleArray}
              />
            </div>
          )}

          {projects.length > 0 && (
            <ExperienceProjectsSection
              projects={projects}
              expandedProjects={expandedProjects}
              toggleProject={toggleProject}
            />
          )}
          {/* Internship Report Button */}
          {(validExperienceName === "bpce" ||
            validExperienceName === "strategin") && (
            <div className="mt-8 mb-4">
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {t("experienceDetailPage.report", "Rapport de stage")}
                </h3>
                <div className="ml-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  PDF
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-5 h-5 text-red-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        {validExperienceName === "bpce"
                          ? "bpce-internship-report.pdf"
                          : "strategin-internship-report.pdf"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm ml-7">
                      {validExperienceName === "bpce"
                        ? "Rapport de stage d'ingénieur DevOps chez BPCE IT"
                        : "Rapport de stage développeur fullstack chez Strateg.in"}
                    </p>
                  </div>

                  <button
                    onClick={togglePDFViewer}
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-sm"
                  >
                    {showPDFViewer ? (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {t(
                          "experienceDetailPage.hideReport",
                          "Masquer le rapport"
                        )}
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {t(
                          "experienceDetailPage.viewReport",
                          "Voir le rapport complet"
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* PDF Viewer */}
          <AnimatePresence>
            {showPDFViewer && (
              <motion.div
                id="pdf-viewer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 w-full max-w-full overflow-hidden"
              >
                <SimplePDFViewer
                  pdfFile={
                    validExperienceName === "bpce"
                      ? INTERNSHIP_REPORTS.bpce
                      : INTERNSHIP_REPORTS.strategin
                  }
                  title={
                    validExperienceName === "bpce"
                      ? t(
                          "experienceDetailPage.bpceReportTitle",
                          "Rapport de stage BPCE IT"
                        )
                      : t(
                          "experienceDetailPage.strateginReportTitle",
                          "Rapport de stage Strateg.in"
                        )
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
