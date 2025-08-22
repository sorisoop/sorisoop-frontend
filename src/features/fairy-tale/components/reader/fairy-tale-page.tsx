import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useFairyTaleReaderContext } from "@/features/fairy-tale/hooks";

export function FairyTalePage() {
  const { data, currentPage } = useFairyTaleReaderContext();
  const page = data[currentPage];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setShowText((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!page) return null;

  return (
    <div className="w-full h-full bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
        <img
          src={page.imageUrl}
          alt={`페이지 ${page.page}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowText((prev) => !prev)}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full 
                   bg-card/20 backdrop-blur-sm hover:bg-card/30 
                   text-card-foreground border border-border"
      >
        {showText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>

      <div
        className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 ${
          showText ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="bg-gradient-to-t from-foreground/50 via-foreground/70 to-transparent pt-16 pb-8">
          <div className="px-6 md:px-8 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light tracking-wide break-keep whitespace-pre-wrap">
                {page.script}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
