import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseApiError } from "./shared/lib/api/errors/base-api-error.ts";
import { toast } from "sonner";
import { Toaster } from "@/shared/components/ui/sonner.tsx";

import "./index.css";
import App from "./App.tsx";

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
        const position = mutation.meta?.position ? "top-right" : "bottom-right";
        if (mode === "toast") {
          toast(error.message, {
            position,
            classNames: {
              toast: "!bg-destructive/80 !text-secondary border !border-destructive",
              description: "!text-secondary",
            },
          });
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
