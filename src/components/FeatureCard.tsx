import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  gradient: string;
}

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  to,
  gradient,
}: FeatureCardProps) => {
  return (
    <Link
      to={to}
      className="block group"
    >
      <div className="relative overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-medium transition-all duration-300 p-6 border border-border group-hover:scale-[1.02]">
        <div className="flex items-start gap-4">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-medium flex-shrink-0", gradient)}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
};
