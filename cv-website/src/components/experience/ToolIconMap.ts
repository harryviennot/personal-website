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
import MySqlInnoDBClusterLogo from "../../assets/images/mysql-innodb-cluster.png";
import NginxLogo from "../../assets/images/nginx.png";
import NodeJSLogo from "../../assets/images/nodejs.png";
import GitLabLogo from "../../assets/images/gitlab.png";
// Map to store tool names to their images
const ToolIconMap: { [key: string]: string } = {
  Jenkins: JenkinsLogo,
  Bitbucket: BitbucketLogo,
  XLRelease: XLReleaseLogo,
  XLDeploy: XLReleaseLogo,
  Artifactory: ArtifactoryLogo,
  MyCloud: MyCloudLogo,
  CyberArk: CyberArkLogo,
  "Microsoft Teams": TeamsLogo,
  Teams: TeamsLogo,
  Confluence: ConfluenceLogo,
  Jira: JiraLogo,
  Podman: PodmanLogo,
  Kubernetes: KubernetesLogo,
  OpenShift: OpenShiftLogo,
  React: ReactLogo,
  "React Native": ReactLogo,
  MongoDB: MongoDBLogo,
  "Ant Design": AntDesignLogo,
  ClickUp: ClickUpLogo,
  Slack: SlackLogo,
  "SendInBlue API": SendInBlueLogo,
  SendInBlue: SendInBlueLogo,
  NextJS: NextJSLogo,
  "XLRelease/XLDeploy": XLReleaseLogo,
  "MySQL InnoDB Cluster": MySqlInnoDBClusterLogo,
  Nginx: NginxLogo,
  "React / Next.js": NextJSLogo,
  "Node.js": NodeJSLogo,
  GitLab: GitLabLogo,
};

export default ToolIconMap;
