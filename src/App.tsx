import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignToText from "./pages/SignToText";
import SpeechToText from "./pages/SpeechToText";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import {useEffect, useRef} from "react";

const queryClient = new QueryClient();

/*
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-to-text" element={<SignToText />} />
          <Route path="/speech-to-text" element={<SpeechToText />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
*/

const keypointLabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  // Initialize webcam
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, []);

  // Send frame to backend
  const sendFrameToBackend = async () => {
    if (!videoRef.current) return null;
    const video = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    if (!blob) return null;

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const res = await fetch("http://localhost:8000/recognize", {
        method: "POST",
        body: formData,
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Draw overlay
  const drawOverlay = (gestures: number[] | undefined) => {
    if (!overlayRef.current) return;
    const ctx = overlayRef.current.getContext("2d");
    if (!ctx) return;

    // Clear previous overlay
    ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);

    if (!gestures) return;

    gestures.forEach((id, i) => {
      const label = keypointLabels[id] ?? "Unknown";
      ctx.fillStyle = "red";
      ctx.font = "24px Arial";
      ctx.fillText(`Gesture: ${label}`, 10, 30 + i * 30);
    });
  };

  // Real-time loop
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await sendFrameToBackend();
      if (data) drawOverlay(data.gestures);
    }, 150); // ~6-7 FPS
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "640px", height: "480px" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={640}
        height={480}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <canvas
        ref={overlayRef}
        width={640}
        height={480}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      />
    </div>
  );
};

export default App;