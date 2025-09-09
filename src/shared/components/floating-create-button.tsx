import { PenLine } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";

export default function FloatingCreateButton() {
  const { pathname } = useLocation();

  const showFab = pathname === "/";

  if (!showFab) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            size="icon"
            className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg bg-primary text-white hover:bg-primary/90"
          >
            <Link to="/draw">
              <PenLine className="h-6 w-6" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="text-secondary">
          그림 그리기
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
