import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

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

const ExperienceDetailPage: React.FC = () => {
  const { experienceName } = useParams<{ experienceName: string }>();

  // Mock data for experiences - in a real app, this would likely come from an API
  const experiences: Experience[] = [
    {
      title: "DevOps Intern",
      company: "BPCE IT",
      slug: "bpce",
      date: "Oct 2023 – May 2024",
      description:
        "Contributed to the automation of deployment pipelines and helped design infrastructure templates for internal tools. Participated in service provisioning and DevOps support for banking environments.",
      fullDescription:
        "As a DevOps intern at BPCE IT in Toulouse, I was part of the Guichet SI Établissements team within the Plateforme Privative division. My role was to assist with the automation and standardization of deployment chains for internal software like Adequasys and UAS. I contributed to the design and implementation of CI/CD pipelines, helped orchestrate service provisioning using MyCloud, and maintained infrastructure templates to streamline project creation. I worked closely with Jenkins, Bitbucket, Artifactory, and XLR/XLD, while adapting to an Agile work environment with frequent meetings and cross-functional collaboration.",
      responsibilities: [
        "Automated provisioning of environments for internal applications using MyCloud and Jenkins",
        "Implemented reusable pipeline templates for XLRelease and Jenkins",
        "Developed and maintained Bitbucket repositories and Jenkinsfiles for deployment flows",
        "Orchestrated CI/CD flows with Jenkins, Artifactory, and Bitbucket",
        "Assisted with the Agile transition and participated in daily team coordination meetings",
      ],
      tools: [
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
      achievements: [
        "Delivered a reusable deployment pipeline that standardized the setup of over 20 projects",
        "Reduced manual configuration time across projects by automating service provisioning",
        "Documented pipeline architecture and onboarding instructions for future team members",
      ],
    },
    {
      title: "Full Stack Developer Intern",
      company: "Strateg.in",
      slug: "strategin",
      date: "Aug 2022 – Dec 2022",
      description:
        "Worked on multiple web and mobile development projects, contributing to both frontend and backend features. Gained experience with React, Node.js, and DevOps tools in a fast-paced startup environment.",
      fullDescription:
        "During my internship at Strateg.in, a digital transformation company for SMEs, I worked on several projects including web platforms, ERPs, and a mobile app. I contributed to full stack development tasks, implemented key features such as dashboards, user progress tracking, and automated reports, and participated in agile ceremonies and code reviews. I also integrated APIs, handled deployments using Docker and Kubernetes, and helped design recommendation algorithms for user course suggestions.",
      responsibilities: [
        "Fixed bugs and implemented PDF/Excel generation features in 'La Méthode Citoyenne' project",
        "Developed core functionalities in 'AEP Formation', including ERP modules, course status systems, and a recommendation algorithm",
        "Created user dashboards and login redirection logic for the web platform",
        "Tracked and modeled user course progress using custom APIs and database schema changes",
        "Worked on the 'Car Co' mobile app to implement bug fixes, event cancellation, and UI improvements",
      ],
      tools: [
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
      achievements: [
        "Built a course recommendation algorithm based on user history and category matching",
        "Led development of user dashboards and ERP components in AEP Formation project",
        "Adapted quickly to multiple tech stacks including React, Next.js, and mobile app development",
        "Successfully transitioned from academic learning to a production-level developer workflow",
      ],
    },

    {
      title: "Hackathon",
      company: "Airbus Innovation Week",
      slug: "airbus-hackathon",
      date: "March 2023",
      description:
        "Participated in a 48-hour hackathon focused on sustainable aviation solutions. Developed a prototype for reducing carbon emissions through optimized flight planning.",
      fullDescription:
        "I participated in the Airbus Innovation Week hackathon, where teams were challenged to develop innovative solutions for sustainable aviation. Our team of four created a prototype application that uses machine learning to optimize flight routes for fuel efficiency, potentially reducing carbon emissions.",
      responsibilities: [
        "Led the frontend development of our prototype application",
        "Integrated with flight data APIs and mapping systems",
        "Presented our solution to a panel of judges from Airbus",
        "Collaborated with team members on algorithm development",
      ],
      tools: [
        "React",
        "Python",
        "TensorFlow",
        "Google Maps API",
        "Flight Data API",
        "Firebase",
      ],
      achievements: [
        "Won the 'Most Innovative Solution' award",
        "Demonstrated a potential 5% reduction in fuel consumption",
        "Successfully completed working prototype within the 48-hour timeframe",
      ],
    },
  ];

  const experience = experiences.find((exp) => exp.slug === experienceName);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Experience not found
          </h2>
          <p className="mt-2 text-gray-600">
            The experience you're looking for doesn't exist.
          </p>
          <Link
            to="/#experience"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Experience
          </Link>
        </div>
      </div>
    );
  }

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
            Back to Experience
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {experience.title}
          </h1>
          <h2 className="text-xl text-blue-600 mb-2">{experience.company}</h2>
          <p className="text-gray-500 mb-6">{experience.date}</p>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {experience.fullDescription}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Responsibilities
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.tools.map((tool, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Key Achievements
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {experience.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>

          <Link
            to="/#experience"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Experience
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
