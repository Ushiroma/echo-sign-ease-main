import { Link, useLocation } from "react-router-dom";
import { Home, Mic, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/sign-to-text", imageUrl: "/connect.png", label: "" },
  { path: "/speech-to-text", icon: Mic, label: "Listen" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong z-50 safe-area-inset-bottom">
      <div className="container max-w-2xl mx-auto">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ path, icon: Icon, imageUrl, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all relative group",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-xl animate-fade-in" />
                )}
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={label}
                    className={cn("w-8 h-8 relative z-10 transition-transform object-contain", 
                      isActive && "scale-110"
                    )} 
                  />
                ) : Icon && (
                  <Icon className={cn("w-6 h-6 relative z-10 transition-transform", 
                    isActive && "scale-110"
                  )} />
                )}
                {label && <span className="text-xs font-medium relative z-10">{label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
