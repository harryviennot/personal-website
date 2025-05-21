import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import adequasysMethodImage from "../../assets/images/AdequasysSchema.png";

const methodImageMap = {
  adequasys: adequasysMethodImage,
};

// Define types for project data structure
export interface ProjectTool {
  name: string;
  reason: string;
}

export interface Project {
  name: string;
  context?: string;
  objective?: string;
  contributions?: string[];
  tools?: ProjectTool[];
  method?: string | null;
  methodImage?: string | null;
  results?: string[];
  challenges?: string[];
}

interface ToolIconMap {
  [key: string]: string;
}

interface ProjectDetailsProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  toggleProject: (index: number) => void;
  toolIconMap: ToolIconMap;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  index,
  isExpanded,
  toggleProject,
  toolIconMap,
}) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden shadow-sm bg-white border border-gray-100"
    >
      <motion.div
        className="p-5 flex justify-between items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onClick={() => toggleProject(index)}
        whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
        transition={{ duration: 0.2 }}
      >
        <h4 className="text-lg font-semibold text-blue-600">{project.name}</h4>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          className="bg-white w-7 h-7 rounded-full flex items-center justify-center shadow-sm"
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.4, 0.0, 0.2, 1],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1],
                },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 py-5">
              {/* Context */}
              {project.context && (
                <div className="mb-6 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t("experienceDetailPage.project.context")}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {project.context}
                  </p>
                </div>
              )}

              {/* Objective */}
              {project.objective && (
                <div className="mb-6 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t("experienceDetailPage.project.objective")}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {project.objective}
                  </p>
                </div>
              )}

              {/* Contributions */}
              {project.contributions && project.contributions.length > 0 && (
                <div className="mb-6 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t("experienceDetailPage.project.contributions")}
                  </h4>
                  <div className="space-y-3">
                    {project.contributions.map((contribution, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="text-blue-500 mr-3 flex-shrink-0">
                          <svg
                            className="w-5 h-5 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                              clipRule="evenodd"
                              fillRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-700">{contribution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              {project.tools && project.tools.length > 0 && (
                <div className="mb-6 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t("experienceDetailPage.project.tools")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.tools.map((tool, idx) => {
                      const toolIcon = toolIconMap[tool.name] || null;

                      return (
                        <div
                          key={idx}
                          className="flex items-center bg-gray-50 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
                        >
                          {toolIcon && (
                            <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-lg flex items-center justify-center bg-white shadow-sm mr-3">
                              <img
                                src={toolIcon}
                                alt={tool.name}
                                className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] max-w-[1.5rem] max-h-[1.5rem] object-contain"
                              />
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-900 block">
                              {tool.name}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {tool.reason}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Methodology */}
              {project.method && (
                <div className="mb-6 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t("experienceDetailPage.project.method")}
                  </h4>
                  {project?.methodImage && (
                    <img
                      src={
                        methodImageMap[
                          project.methodImage as keyof typeof methodImageMap
                        ]
                      }
                      alt="Méthodologie"
                      className="w-full h-auto mb-4"
                    />
                  )}
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {project.method}
                  </p>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div className="mb-6 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t("experienceDetailPage.project.results")}
                  </h4>
                  <div className="space-y-3">
                    {project.results.map((result, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="text-green-500 mr-3 flex-shrink-0">
                          <svg
                            className="w-5 h-5 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-700">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="mb-4 bg-white rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    {t("experienceDetailPage.project.challenges")}
                  </h4>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="text-amber-500 mr-3 flex-shrink-0">
                          <svg
                            className="w-5 h-5 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-700">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetails;
