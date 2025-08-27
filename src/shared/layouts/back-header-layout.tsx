import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface BackHeaderLayoutProps {
  children: React.ReactNode;
  title?: string;
  rightButtonLabel?: string;
  onRightButtonClick?: () => void;
}

export default function BackHeaderLayout({
  children,
  title = "",
  rightButtonLabel,
  onRightButtonClick,
}: BackHeaderLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      id="main-container"
      className="flex min-h-dvh w-full max-w-screen-lg mx-auto flex-col items-center bg-background text-foreground"
    >
      <header className="sticky top-0 z-20 w-full border-b border-border bg-background/90 backdrop-blur pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-screen-lg h-[52px] px-4 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 cursor-pointer"
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <ArrowLeft className="!h-5 !w-5 text-foreground" />
          </Button>

          <div className="flex-1 truncate text-center text-sm font-bold text-muted-foreground">{title}</div>

          {rightButtonLabel && onRightButtonClick ? (
            <Button
              variant="link"
              size="sm"
              className="h-6 px-2 text-primary font-semibold cursor-pointer"
              onClick={onRightButtonClick}
            >
              {rightButtonLabel}
            </Button>
          ) : (
            <div className="h-6 w-6" />
          )}
        </div>
      </header>

      <main id="main-content" className="w-full flex-1">
        <div className="mx-auto max-w-screen-lg px-4 pb-safe-bottom">{children}</div>
      </main>

      {/* Background layers */}
      <div aria-hidden className="pointer-events-none -z-50">
        <div className="fixed inset-0 -z-50 bg-muted" />
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 -z-40 w-full max-w-screen-lg bg-background" />
      </div>
    </div>
  );
}
