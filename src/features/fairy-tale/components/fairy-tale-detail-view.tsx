import { useIsDeskTop } from "@/shared/hooks";
import type { ReactNode } from "react";

export default function FairyTaleDetailView({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

FairyTaleDetailView.isMobile = function IsMobile({ children }: { children: ReactNode }) {
  const isDesktop = useIsDeskTop();
  return isDesktop ? null : <>{children}</>;
};

FairyTaleDetailView.isDeskTop = function IsDeskTop({ children }: { children: ReactNode }) {
  const isDesktop = useIsDeskTop();
  return isDesktop ? <>{children}</> : null;
};
