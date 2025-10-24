import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon?: LucideIcon;
  title: string;
  description: string;
}

function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
  return (
    <div className=" px-8 py-6">
      <h2 className="text-2xl font-bold  flex items-center gap-3">
        {Icon && <Icon className="w-7 h-7 text-brand-500" />}
        {title}
      </h2>
      <p className="text-brand-400 mt-2 text-sm">{description}</p>
    </div>
  );
}
export default SectionHeader;
