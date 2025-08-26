import { useIsDeskTop } from "@/shared/hooks";
import type { ReactNode } from "react";

export default function CustomFairyTaleDetailView({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

CustomFairyTaleDetailView.isMobile = function IsMobile({ children }: { children: ReactNode }) {
  const isDesktop = useIsDeskTop();
  return isDesktop ? null : <>{children}</>;
};

CustomFairyTaleDetailView.isDeskTop = function IsDeskTop({ children }: { children: ReactNode }) {
  const isDesktop = useIsDeskTop();
  return isDesktop ? <>{children}</> : null;
};
