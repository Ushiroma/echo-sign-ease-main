import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { MessageSquare, Mic, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <Header title="SignConnect" subtitle="Your sign language assistant" />
      
      <main className="container max-w-2xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-gradient-primary rounded-3xl p-8 shadow-medium text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Welcome</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                Break communication barriers
              </h2>
              <p className="text-white/80 text-sm">
                Translate sign language to text and text to speech instantly
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2">
            Features
          </h3>
          
          <FeatureCard
            title="Sign to Text"
            description="Use your camera to translate sign language into text in real-time"
            icon={MessageSquare}
            to="/sign-to-text"
            gradient="bg-gradient-primary"
          />
          
          <FeatureCard
            title="Text to Speech"
            description="Convert your written text into natural-sounding speech instantly"
            icon={Mic}
            to="/text-to-speech"
            gradient="bg-gradient-accent"
          />
        </div>

        {/* Quick Tips */}
        <div className="mt-8 p-6 bg-secondary/50 rounded-2xl border border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Quick Tips
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Ensure good lighting for better sign recognition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Keep your hands within the camera frame</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success mt-0.5">•</span>
              <span>Speak clearly for accurate text-to-speech</span>
            </li>
          </ul>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Index;
