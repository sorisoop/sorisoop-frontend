import { useSearchStore } from "@/store/search";
import { useEffect } from "react";

export function SearchSidebarOverlay() {
  const { isOpen, close } = useSearchStore();

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return <div className="fixed inset-0 bg-foreground/50 z-40 backdrop-blur-sm" onClick={close} />;
}
