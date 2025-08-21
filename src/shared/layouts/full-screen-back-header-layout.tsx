import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface FullScreenBackLayoutProps {
  children: React.ReactNode;
}

export default function FullScreenBackHeaderLayout({ children }: FullScreenBackLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      id="main-container"
      className="relative flex min-h-screen w-full max-w-screen-lg mx-auto flex-col bg-background text-foreground"
    >
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0 cursor-pointer"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          <ArrowLeft className="!h-5 !w-5 text-foreground" />
        </Button>
      </div>

      <main id="main-content" className="w-full flex-1">
        <div className="mx-auto max-w-screen-lg h-full">{children}</div>
      </main>

      <div aria-hidden className="pointer-events-none -z-50">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 -z-40 w-full max-w-screen-lg bg-background" />
      </div>
    </div>
  );
}
