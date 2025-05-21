import JenkinsLogo from "../../assets/images/jenkins.png";
import BitbucketLogo from "../../assets/images/bitbucket.png";
import XLReleaseLogo from "../../assets/images/xlrelease.png";
import ArtifactoryLogo from "../../assets/images/artifactory.png";
import CyberArkLogo from "../../assets/images/cyberark.png";
import TeamsLogo from "../../assets/images/teams.png";
import ConfluenceLogo from "../../assets/images/confluence.png";
import JiraLogo from "../../assets/images/jira.png";
import PodmanLogo from "../../assets/images/podman.png";
import KubernetesLogo from "../../assets/images/kubernetes.png";
import ReactLogo from "../../assets/images/react.png";
import MongoDBLogo from "../../assets/images/mongodb.png";
import AntDesignLogo from "../../assets/images/antdesign.png";
import ClickUpLogo from "../../assets/images/clickup.png";
import SlackLogo from "../../assets/images/slack.png";
import SendInBlueLogo from "../../assets/images/sendinblue.png";
import MyCloudLogo from "../../assets/images/mycloud.png";
import OpenShiftLogo from "../../assets/images/openshift.png";
import NextJSLogo from "../../assets/images/nextjs.png";
// Define a type for the tools
interface ToolInfo {
  name: string;
  image_path: string;
}

export interface ExperienceTools {
  [key: string]: ToolInfo[];
}

// Map of experience name to array of tools
const experienceToolsMap: ExperienceTools = {
  bpce: [
    {
      name: "Jenkins",
      image_path: JenkinsLogo,
    },
    {
      name: "Bitbucket",
      image_path: BitbucketLogo,
    },
    {
      name: "XLRelease",
      image_path: XLReleaseLogo,
    },
    {
      name: "XLDeploy",
      image_path: XLReleaseLogo,
    },
    {
      name: "Artifactory",
      image_path: ArtifactoryLogo,
    },
    {
      name: "MyCloud",
      image_path: MyCloudLogo,
    },
    {
      name: "CyberArk",
      image_path: CyberArkLogo,
    },
    {
      name: "Microsoft Teams",
      image_path: TeamsLogo,
    },
    {
      name: "Confluence",
      image_path: ConfluenceLogo,
    },
    {
      name: "Jira",
      image_path: JiraLogo,
    },
    {
      name: "Groovy",
      image_path: "/assets/images/groovy.png",
    },
    {
      name: "Podman",
      image_path: PodmanLogo,
    },
    {
      name: "Kubernetes",
      image_path: KubernetesLogo,
    },
    {
      name: "OpenShift",
      image_path: OpenShiftLogo,
    },
  ],
  strategin: [
    {
      name: "React",
      image_path: ReactLogo,
    },
    {
      name: "NextJS",
      image_path: NextJSLogo,
    },
    {
      name: "React Native",
      image_path: ReactLogo,
    },
    {
      name: "Slack",
      image_path: SlackLogo,
    },
    {
      name: "ClickUp",
      image_path: ClickUpLogo,
    },
    {
      name: "Ant Design",
      image_path: AntDesignLogo,
    },
    {
      name: "SendInBlue API",
      image_path: SendInBlueLogo,
    },
    {
      name: "MongoDB",
      image_path: MongoDBLogo,
    },
  ],
  "airbus-hackathon": [
    {
      name: "React",
      image_path: ReactLogo,
    },
    {
      name: "Python",
      image_path: "/assets/images/python.png",
    },
    {
      name: "TensorFlow",
      image_path: "/assets/images/tensorflow.png",
    },
    {
      name: "Google Maps API",
      image_path: "/assets/images/google-maps.png",
    },
    {
      name: "Flight Data API",
      image_path: "/assets/images/flight-data-api.png",
    },
    {
      name: "Firebase",
      image_path: "/assets/images/firebase.png",
    },
  ],
};

export default experienceToolsMap;
