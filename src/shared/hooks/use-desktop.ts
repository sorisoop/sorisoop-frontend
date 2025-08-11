import { useEffect, useState } from "react";

export const useIsDeskTop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 512px)").matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 512px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener?.("change", handler);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  return isDesktop;
};
