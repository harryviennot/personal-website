import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

// Import components
import { ProjectTool } from "../components/experience/ProjectDetails";

import SupplierDependencyImage from "../assets/images/supplier-dependency-graph.png";
import SupplierRiskImage from "../assets/images/supplier-risk-heatmap.png";

// Type definition for visualization data
interface VisualData {
  title: string;
  description: string;
  file: string;
}

const hackathonMap: {
  [key: string]: string;
} = {
  airbus: "airbusHackathon",
};

const visualMap: {
  [key: string]: string;
} = {
  "supplier-dependency-graph": SupplierDependencyImage,
  "supplier-risk-heatmap": SupplierRiskImage,
};

const HackathonDetailPage: React.FC = () => {
  const { hackathonName } = useParams<{ hackathonName: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll behavior for smoother experience that centers the section
  const scrollToSection = (sectionId: string) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 400);
  };

  const handleBackToHackathons = () => {
    scrollToSection("experience");
  };

  if (!hackathonName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("hackathonDetailPage.notFound.title")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("hackathonDetailPage.notFound.message")}
          </p>
          <button
            onClick={handleBackToHackathons}
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("hackathonDetailPage.backToExperiences")}
          </button>
        </div>
      </div>
    );
  }

  const validHackathonName = hackathonMap[hackathonName];

  // Check if this hackathon exists in translations
  const titleKey = `experience.${validHackathonName}.title`;
  const title = t(titleKey);

  if (title === titleKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {t("hackathonDetailPage.notFound.title")}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("hackathonDetailPage.notFound.message")}
          </p>
          <button
            onClick={handleBackToHackathons}
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("hackathonDetailPage.backToExperiences")}
          </button>
        </div>
      </div>
    );
  }

  const company = t(`experience.${validHackathonName}.company`);
  const date = t(`experience.${validHackathonName}.date`);
  const description = t(`experience.${validHackathonName}.description`);

  // Get context and challenge if they exist
  const contextKey = `experience.${validHackathonName}.context`;
  const context = t(contextKey);
  const hasContext = context !== contextKey;

  const challengeKey = `experience.${validHackathonName}.challenge`;
  const challenge = t(challengeKey);
  const hasChallenge = challenge !== challengeKey;

  // Get solution data
  const solutionKey = `experience.${validHackathonName}.solution`;
  const solutionData = t(solutionKey, { returnObjects: true }) as any;

  // Get GitHub and link URLs if they exist
  const githubKey = `experience.${validHackathonName}.github`;
  const github = t(githubKey);
  const hasGithub = github !== githubKey;

  const linkKey = `experience.${validHackathonName}.link`;
  const link = t(linkKey);
  const hasLink = link !== linkKey;

  // Get achievements
  const achievementsKey = `experience.${validHackathonName}.achievements`;
  const achievements = t(achievementsKey, { returnObjects: true }) as string[];
  const hasAchievements = Array.isArray(achievements);

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
            onClick={handleBackToHackathons}
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
            {t("hackathonDetailPage.backToExperiences")}
          </button>

          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <h2 className="text-xl text-blue-600 mb-2">{company}</h2>
          <p className="text-gray-500 mb-6">{date}</p>

          {/* Description */}
          <p className="text-gray-700 mb-8 text-lg">{description}</p>

          {/* External Links */}
          {(hasGithub || hasLink) && (
            <div className="flex flex-wrap gap-4 mb-8">
              {hasGithub && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {hasLink && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {t("hackathonDetailPage.article")}
                </a>
              )}
            </div>
          )}

          {/* Context Section */}
          {hasContext && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("hackathonDetailPage.context")}
              </h3>
              <p className="text-gray-700 leading-relaxed">{context}</p>
            </div>
          )}

          {/* Challenge Section */}
          {hasChallenge && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("hackathonDetailPage.challenge")}
              </h3>
              <p className="text-gray-700 leading-relaxed">{challenge}</p>
            </div>
          )}

          {/* Solution Section */}
          {solutionData && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-5">
                {t("hackathonDetailPage.solution")}
              </h3>

              {/* Summary */}
              {solutionData.summary && (
                <p className="text-gray-700 leading-relaxed mb-6">
                  {solutionData.summary}
                </p>
              )}

              {/* Features */}
              {solutionData.features && solutionData.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {t("hackathonDetailPage.functionality")}
                  </h4>
                  <div className="space-y-3 mb-6">
                    {solutionData.features.map(
                      (feature: string, idx: number) => (
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
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {solutionData.techStack && solutionData.techStack.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {t("hackathonDetailPage.techStackTitle")}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {solutionData.techStack.map(
                      (tool: ProjectTool, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center bg-gray-50 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
                        >
                          <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-lg flex items-center justify-center bg-white shadow-sm mr-3">
                            <svg
                              className="w-6 h-6 text-blue-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 block">
                              {tool.name}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {tool.reason}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Visuals */}
              {solutionData.visuals && solutionData.visuals.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {t("hackathonDetailPage.screenshots")}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {solutionData.visuals.map(
                      (visual: VisualData, idx: number) => (
                        <div
                          key={idx}
                          className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                        >
                          <div className="p-4 border-b border-gray-100">
                            <h5 className="font-medium text-gray-900">
                              {visual.title}
                            </h5>
                          </div>
                          <div className="p-4">
                            <p className="text-gray-700 mb-4 text-sm">
                              {visual.description}
                            </p>
                            <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
                              <img
                                src={visualMap[visual.file]}
                                alt={visual.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Achievements Section */}
          {hasAchievements && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("hackathonDetailPage.achievements")}
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
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
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
