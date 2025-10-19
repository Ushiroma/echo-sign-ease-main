import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Volume2, Camera, Globe } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <Header 
        title="Settings" 
        subtitle="Customize your experience"
      />
      
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Preferences */}
        <div className="space-y-3 animate-fade-in">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2">
            Preferences
          </h3>
          
          <Card className="p-6 space-y-6 shadow-medium border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label className="font-semibold">Notifications</Label>
                  <p className="text-xs text-muted-foreground">Get translation alerts</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <Label className="font-semibold">Auto-play Speech</Label>
                  <p className="text-xs text-muted-foreground">Play audio automatically</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-success" />
                </div>
                <div>
                  <Label className="font-semibold">Camera Mirror</Label>
                  <p className="text-xs text-muted-foreground">Mirror camera view</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label className="font-semibold">Language</Label>
                  <p className="text-xs text-muted-foreground">English (US)</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Change</span>
            </div>
          </Card>
        </div>

        {/* About */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-2">
            About
          </h3>
          
          <Card className="p-6 shadow-medium border-border">
            <div className="text-center space-y-2">
              <p className="text-sm text-foreground font-medium">SignSpeak v1.0</p>
              <p className="text-xs text-muted-foreground">
                Making communication accessible for everyone
              </p>
            </div>
          </Card>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Settings;
