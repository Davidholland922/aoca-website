import {
  Building2,
  ClipboardList,
  ShieldCheck,
  Map,
  SearchCheck,
  HardHat,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  building: Building2,
  clipboard: ClipboardList,
  shield: ShieldCheck,
  map: Map,
  search: SearchCheck,
  hardhat: HardHat,
};

export default function ServiceIcon({
  name,
  className,
  size = 26,
}: {
  name: string;
  className?: string;
  size?: number;
}) {
  const Icon = icons[name] ?? Building2;
  return <Icon size={size} className={className} aria-hidden />;
}
