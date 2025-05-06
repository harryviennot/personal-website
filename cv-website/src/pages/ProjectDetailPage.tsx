import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface Project {
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  githubUrl: string;
  duration?: string;
  images?: string[];
}

const ProjectDetailPage: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();

  // Mock data for projects - in a real app, this would likely come from an API
  const projects: Project[] = [
    {
      name: "BotButler",
      slug: "botbutler",
      description:
        "AI assistant platform that connects to services like Slack and Jira to automate internal workflows using contextual data and file ingestion.",
      fullDescription:
        "BotButler is an AI assistant platform that integrates with popular workplace tools like Slack and Jira to automate routine tasks and workflows. The platform uses natural language processing to understand user requests and can access company knowledge bases to provide contextual responses. BotButler can ingest files, analyze them, and take action based on their content, making it a powerful tool for streamlining business processes.",
      techStack: [
        "React",
        "Node.js",
        "OpenAI API",
        "MongoDB",
        "AWS Lambda",
        "TypeScript",
      ],
      githubUrl: "https://github.com/harryviennot/botbutler",
      duration: "Jan 2023 - Present",
      images: ["/projects/botbutler-1.jpg", "/projects/botbutler-2.jpg"],
    },
    {
      name: "Movie Match",
      slug: "movie-match",
      description:
        "React Native app to match on movies with friends and create collaborative watchlists. Features real-time chat and integration with TheMovieDB API.",
      fullDescription:
        "Movie Match is a mobile application built with React Native that helps friends decide what movies to watch together. Users can swipe on movies (similar to dating apps) and when there's a match between friends, it's added to a collaborative watchlist. The app features real-time chat so users can discuss their matched movies, and integrates with TheMovieDB API for comprehensive movie data, trailers, and reviews.",
      techStack: [
        "React Native",
        "Firebase",
        "TheMovieDB API",
        "Redux",
        "Expo",
      ],
      githubUrl: "https://github.com/harryviennot/movie-match",
      duration: "Sep 2022 - Dec 2022",
      images: ["/projects/moviematch-1.jpg", "/projects/moviematch-2.jpg"],
    },
    {
      name: "Mirage",
      slug: "mirage",
      description:
        "A cloud infrastructure visualization tool that generates interactive diagrams from your terraform or cloudformation templates.",
      fullDescription:
        "Mirage is a developer tool that automatically generates visual diagrams of cloud infrastructure defined in IaC templates like Terraform or CloudFormation. The tool parses template files, analyzes resource relationships, and produces interactive, shareable diagrams that help teams understand complex infrastructure setups. Mirage supports AWS, Azure, and GCP resources, with real-time updates as infrastructure code changes.",
      techStack: ["Go", "React", "D3.js", "AWS CDK", "Docker"],
      githubUrl: "https://github.com/harryviennot/mirage",
      duration: "Mar 2022 - Aug 2022",
      images: ["/projects/mirage-1.jpg", "/projects/mirage-2.jpg"],
    },
  ];

  const project = projects.find((p) => p.slug === projectName);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Project not found
          </h2>
          <p className="mt-2 text-gray-600">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/#projects"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Projects
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
            Back to Projects
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {project.name}
          </h1>

          {project.duration && (
            <p className="text-gray-500 mb-6">{project.duration}</p>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Screenshots
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      src={image}
                      alt={`${project.name} screenshot ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Links</h2>
            <a
              href={project.githubUrl}
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
              View source code on GitHub
            </a>
          </div>

          <Link
            to="/#projects"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
