import { useIsDeskTop } from "@/shared/hooks";
import type { ReactNode } from "react";

export default function FairyTaleDetailView({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-dvh bg-background text-foreground flex flex-col">
      <div
        className="flex-1 overscroll-contain
                   pt-[env(safe-area-inset-top)] 
                   pb-[env(safe-area-inset-bottom)]"
      >
        {children}
      </div>
    </div>
  );
}

FairyTaleDetailView.isMobile = function IsMobile({ children }: { children: ReactNode }) {
  const isDesktop = useIsDeskTop();
  return isDesktop ? null : <>{children}</>;
};

FairyTaleDetailView.isDeskTop = function IsDeskTop({ children }: { children: ReactNode }) {
  const isDesktop = useIsDeskTop();
  return isDesktop ? <>{children}</> : null;
};
