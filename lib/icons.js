import {
  Smartphone,
  Brain,
  Layers,
  Code2,
  Server,
  GitBranch,
  Sparkles,
} from "lucide-react";

export const iconMap = {
  smartphone: Smartphone,
  brain: Brain,
  layers: Layers,
  code: Code2,
  server: Server,
  gitBranch: GitBranch,
  sparkles: Sparkles,
};

export function getIcon(name) {
  return iconMap[name] || Sparkles;
}
