import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Trash2, Save, Download, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedData {
  id: string;
  text: string;
  timestamp: string;
}

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [savedData, setSavedData] = useState<SavedData[]>([]);
  const { toast } = useToast();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Load saved data from localStorage
    const saved = localStorage.getItem('speechToTextSavedData');
    if (saved) {
      setSavedData(JSON.parse(saved));
    }

    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          }
        }
        if (finalTranscript) {
          setText((prev) => prev + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Error",
          description: "Failed to recognize speech",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [toast]);

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const clearText = () => {
    setText("");
  };

  const saveText = () => {
    if (!text.trim()) {
      toast({
        title: "No text to save",
        description: "Please enter some text before saving",
        variant: "destructive",
      });
      return;
    }

    const newSavedData: SavedData = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date().toLocaleString(),
    };

    const updatedSavedData = [newSavedData, ...savedData];
    setSavedData(updatedSavedData);
    localStorage.setItem('speechToTextSavedData', JSON.stringify(updatedSavedData));

    toast({
      title: "Saved",
      description: "Text has been saved successfully",
    });
  };

  const loadSavedText = (savedText: string) => {
    setText(savedText);
    toast({
      title: "Loaded",
      description: "Saved text has been loaded",
    });
  };

  const deleteSavedData = (id: string) => {
    const updatedSavedData = savedData.filter(item => item.id !== id);
    setSavedData(updatedSavedData);
    localStorage.setItem('speechToTextSavedData', JSON.stringify(updatedSavedData));

    toast({
      title: "Deleted",
      description: "Saved text has been deleted",
    });
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <Header title="Speech to Text" subtitle="Convert speech to text" />
      
      <main className="flex-1 container max-w-2xl mx-auto p-4">
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your speech will appear here..."
            className="min-h-[200px] resize-none"
          />
          
          <div className="flex justify-between gap-2">
            <Button
              onClick={toggleListening}
              size="lg"
              className="flex-1"
              variant={isListening ? "destructive" : "default"}
            >
              {isListening ? (
                <>
                  <Square className="w-5 h-5 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={saveText}
              size="lg"
              variant="outline"
              disabled={!text.trim()}
            >
              <Save className="w-5 h-5" />
            </Button>
            
            <Button
              onClick={clearText}
              size="lg"
              variant="outline"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Saved Data Section */}
        {savedData.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Saved Data</h3>
            <div className="space-y-3">
              {savedData.map((item) => (
                <Card key={item.id} className="border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {item.timestamp}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => loadSavedText(item.text)}
                          size="sm"
                          variant="outline"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => deleteSavedData(item.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Navigation />
    </div>
  );
};

export default SpeechToText;