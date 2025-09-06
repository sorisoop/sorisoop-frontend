import { Button } from "@/shared/components/ui/button";
import { useCustomTtsContext } from "@/features/fairy-tale/hooks";
import { PauseCircle, PlayCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";

export function CustomFairyTaleToggleAutoPlayButton() {
  const { autoPlayEnabled, setAutoPlayEnabled, isPlaying, play, pause } = useCustomTtsContext();

  const handleToggle = () => {
    setAutoPlayEnabled((prev) => {
      const next = !prev;

      if (next) {
        if (!isPlaying) play();
      } else {
        if (isPlaying) pause();
      }

      return next;
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggle}
            className="z-50 w-10 h-10 rounded-full
                       bg-card/20 backdrop-blur-sm hover:bg-card/30 
                       text-card-foreground border border-border "
          >
            {autoPlayEnabled ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-secondary">
          {autoPlayEnabled ? "자동재생 끄기" : "자동재생 켜기"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
