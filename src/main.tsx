import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { toast } from "sonner";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseApiError } from "@/shared/lib/api/errors/base-api-error.ts";
import { Toaster } from "@/shared/components/ui/sonner.tsx";

import "./index.css";
import App from "./App.tsx";

type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (error instanceof BaseApiError) {
        const mode = mutation.meta?.displayMode;
        if (mode === "toast") {
          const position: ToastPosition = (mutation.meta?.position as ToastPosition) ?? "top-right";
          toast.error(error.userMessage, { position });
        }
      }
    },
  }),
});

const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true);

if (isStandalone) document.documentElement.style.setProperty("--safe-area-top", "20px");
else document.documentElement.style.setProperty("--safe-area-top", "env(safe-area-inset-top)");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
