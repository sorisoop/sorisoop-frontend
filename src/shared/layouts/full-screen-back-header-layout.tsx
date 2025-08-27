import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface FullScreenBackLayoutProps {
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export default function FullScreenBackHeaderLayout({ children, rightSlot }: FullScreenBackLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      id="main-container"
      className="relative flex h-dvh w-full max-w-screen-lg mx-auto flex-col items-center bg-background text-foreground"
    >
      <header className="absolute top-2 left-2 right-2 pt-[env(safe-area-inset-top)] z-50 flex items-center justify-between">
        <Button
          variant="link"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full bg-transparent cursor-pointer"
        >
          <ArrowLeft className="!h-6 !w-6 text-foreground font-bold" />
        </Button>

        <div className="flex items-center">{rightSlot}</div>
      </header>
      <main id="main-content" className="w-full flex-1">
        <div className="mx-auto max-w-screen-lg">{children}</div>
      </main>

      <div aria-hidden className="pointer-events-none -z-50">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 -z-40 w-full max-w-screen-lg bg-background" />
      </div>
    </div>
  );
}
