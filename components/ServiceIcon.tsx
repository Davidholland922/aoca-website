import {
  Scale,
  Route,
  Building2,
  ClipboardList,
  Briefcase,
  ShieldCheck,
  Flame,
  Layers,
  ScanSearch,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  scale: Scale,
  route: Route,
  building: Building2,
  clipboard: ClipboardList,
  briefcase: Briefcase,
  shield: ShieldCheck,
  flame: Flame,
  layers: Layers,
  scan: ScanSearch,
  flask: FlaskConical,
};

export default function ServiceIcon({
  name,
  className,
  size = 24,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = icons[name] ?? Building2;
  return <Icon size={size} className={className} aria-hidden />;
}
