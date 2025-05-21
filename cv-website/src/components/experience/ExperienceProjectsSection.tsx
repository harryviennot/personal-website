import React from "react";
import { Project } from "./ProjectDetails";
import ProjectDetails from "./ProjectDetails";
import ToolIconMap from "./ToolIconMap";
import { useTranslation } from "react-i18next";
interface ExperienceProjectsSectionProps {
  projects: Project[];
  expandedProjects: { [key: number]: boolean };
  toggleProject: (index: number) => void;
}

const ExperienceProjectsSection: React.FC<ExperienceProjectsSectionProps> = ({
  projects,
  expandedProjects,
  toggleProject,
}) => {
  const { t } = useTranslation();
  if (projects.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-5">
        {t("experienceDetailPage.project.title")}
      </h3>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <ProjectDetails
            key={index}
            project={project}
            index={index}
            isExpanded={!!expandedProjects[index]}
            toggleProject={toggleProject}
            toolIconMap={ToolIconMap}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceProjectsSection;
