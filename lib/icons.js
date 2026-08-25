import {
  Smartphone,
  Brain,
  Layers,
  Code2,
  Server,
  GitBranch,
} from "lucide-react";

export const iconMap = {
  smartphone: Smartphone,
  brain: Brain,
  layers: Layers,
  code: Code2,
  server: Server,
  gitBranch: GitBranch,
};

export function getIcon(name) {
  return iconMap[name] || Smartphone;
}
