import { useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCustomFairyTaleReaderStandaloneContext } from "@/features/fairy-tale/hooks";

export function CustomFairyTaleToggleTextButton() {
  const { showText, setShowText } = useCustomFairyTaleReaderStandaloneContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setShowText((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowText]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setShowText((prev) => !prev)}
      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full 
                 bg-card/20 backdrop-blur-sm hover:bg-card/30 
                 text-card-foreground border border-border"
    >
      {showText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  );
}
