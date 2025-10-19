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

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize webcam
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, []);

  const captureFrame = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const response = await fetch("http://localhost:8000/recognize", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Detected gestures:", data.gestures);
      } catch (err) {
        console.error(err);
      }
    }, "image/jpeg");
  };

  // Capture every 150ms (~6-7 FPS)
  useEffect(() => {
    const interval = setInterval(captureFrame, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width={640} height={480} />
      <p>Check console for detected gestures in real-time</p>
    </div>
  );
};

export default App;
