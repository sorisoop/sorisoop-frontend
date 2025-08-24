import { useSearchStore } from "@/store/search";
import { useEffect } from "react";

export function SearchSidebarOverlay() {
  const { isOpen, close } = useSearchStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return <div className="fixed inset-0 bg-foreground/50 z-40 backdrop-blur-sm" onClick={close} />;
}
