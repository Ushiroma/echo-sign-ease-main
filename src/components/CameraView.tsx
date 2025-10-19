import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, VideoOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CameraViewProps {
  isActive: boolean;
  onToggle: () => void;
}

export const CameraView = ({ isActive, onToggle }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
        toast({
          title: "Camera access denied",
          description: "Please allow camera access to use sign translation",
          variant: "destructive",
        });
      }
    };

    if (isActive) {
      startCamera();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isActive, toast]);

  return (
    <div className="relative w-full aspect-video bg-muted rounded-2xl overflow-hidden shadow-medium">
      {isActive ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <VideoOff className="w-16 h-16 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Camera off</p>
        </div>
      )}
      
      <Button
        onClick={onToggle}
        size="lg"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card shadow-medium hover:shadow-soft transition-all"
        variant="outline"
      >
        {isActive ? <VideoOff className="w-5 h-5 mr-2" /> : <Video className="w-5 h-5 mr-2" />}
        {isActive ? "Stop" : "Start"}
      </Button>
    </div>
  );
};
