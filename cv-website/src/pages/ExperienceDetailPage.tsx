import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

interface Experience {
  title: string;
  company: string;
  slug: string;
  date: string;
  description: string;
  fullDescription: string;
  responsibilities: string[];
  tools: string[];
  achievements: string[];
}

// Define a type for the tools, as they are not translated
interface ExperienceTools {
  [key: string]: string[];
}

const ExperienceDetailPage: React.FC = () => {
  const { experienceName } = useParams<{ experienceName: string }>();
  const { t } = useTranslation();

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
          <Link
            to="/#experience"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("experienceDetailPage.backToExperience")}
          </Link>
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
          <Link
            to="/#experience"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("experienceDetailPage.backToExperience")}
          </Link>
        </div>
      </div>
    );
  }

  const company = t(`experience.${validExperienceName}.company`);
  const date = t(`experience.${validExperienceName}.date`);
  const fullDescription = t(
    `experience.${validExperienceName}.fullDescription`
  );

  // For arrays, explicitly cast to string[] after checking if it's an array.
  let responsibilities: string[] = [];
  const responsibilitiesData = t(
    `experience.${validExperienceName}.responsibilities`,
    { returnObjects: true }
  );
  if (Array.isArray(responsibilitiesData)) {
    responsibilities = responsibilitiesData.filter(
      (item) => typeof item === "string"
    ) as string[];
  }

  let achievements: string[] = [];
  const achievementsData = t(`experience.${validExperienceName}.achievements`, {
    returnObjects: true,
  });
  if (Array.isArray(achievementsData)) {
    achievements = achievementsData.filter(
      (item) => typeof item === "string"
    ) as string[];
  }

  const allTools: ExperienceTools = {
    bpce: [
      "Jenkins",
      "Bitbucket",
      "XLRelease",
      "XLDeploy",
      "Artifactory",
      "MyCloud",
      "CyberArk",
      "Microsoft Teams",
      "Confluence",
      "Jira",
      "Groovy",
      "Podman",
      "Kubernetes",
    ],
    strategin: [
      "React",
      "React Native",
      "Node.js",
      "GitLab",
      "Slack",
      "ClickUp",
      "Ant Design",
      "SendInBlue API",
      "MongoDB",
    ],
    "airbus-hackathon": [
      "React",
      "Python",
      "TensorFlow",
      "Google Maps API",
      "Flight Data API",
      "Firebase",
    ],
  };
  const tools = allTools[validExperienceName] || [];

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
            to="/#experience"
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
            {t("experienceDetailPage.backToExperience")}
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <h2 className="text-xl text-blue-600 mb-2">{company}</h2>
          <p className="text-gray-500 mb-6">{date}</p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {t("experienceDetailPage.overviewTitle")}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <Trans i18nKey={fullDescription} defaults={fullDescription}>
                {fullDescription}
              </Trans>
            </p>
          </div>

          {responsibilities.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("experienceDetailPage.responsibilitiesTitle")}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {responsibilities.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </div>
          )}

          {tools.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("experienceDetailPage.toolsTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {achievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("experienceDetailPage.achievementsTitle")}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}

          <Link
            to="/#experience"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            {t("experienceDetailPage.backToExperience")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
