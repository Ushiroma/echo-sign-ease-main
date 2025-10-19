import { useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { CameraView } from "@/components/CameraView";
import { Button } from "@/components/ui/button";
import { Copy, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignToText = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  const handleSpeak = () => {
    if (!translatedText) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      toast({
        title: "Speaking",
        description: "Playing text-to-speech",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <Header 
        title="Sign to Text" 
        subtitle="Translate sign language to text"
      />
      
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Camera Section */}
        <div className="animate-fade-in">
          <CameraView
            isActive={cameraActive}
            onToggle={() => setCameraActive(!cameraActive)}
          />
        </div>

        {/* Translation Output */}
        <div className="bg-card rounded-3xl p-6 shadow-medium border border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Translation
            </h3>
            {translatedText && (
              <div className="flex gap-2">
                <Button
                  onClick={handleSpeak}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleCopy}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="min-h-[120px] p-4 bg-muted/30 rounded-2xl">
            {translatedText ? (
              <p className="text-foreground">{translatedText}</p>
            ) : (
              <p className="text-muted-foreground text-sm">
                {cameraActive 
                  ? "Show signs to the camera to see translation..." 
                  : "Start camera to begin translating"}
              </p>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-secondary/50 rounded-2xl p-4 border border-border animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-muted-foreground text-center">
            💡 Position your hands clearly within the frame for best results
          </p>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default SignToText;
