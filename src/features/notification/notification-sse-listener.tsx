import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { WebViewFacade } from "@/shared/webview";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NotificationSseListener() {
  const { isWebView } = useIsWebview();
  const location = useLocation();

  const disabledPaths = ["/auth/login", "/auth/signup", "/profile"];
  const shouldConnect = !disabledPaths.includes(location.pathname);

  const retryDelay = useRef(1000); // 1초 시작
  const retryTimer = useRef<NodeJS.Timeout | null>(null);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!shouldConnect) return;

    function connect() {
      const es = new EventSource(`${API_BASE_URL}/notifications/subscribe`, {
        withCredentials: true,
      });
      esRef.current = es;

      es.addEventListener("CONNECTED", () => {
        retryDelay.current = 1000;
      });

      es.addEventListener("make-fairy-tale-complete", (e) => {
        const data = (e as MessageEvent).data;

        if (isWebView) WebViewFacade.sendNotification(data);
        else
          toast.success(data, {
            position: "top-right",
          });
      });

      es.onerror = () => {
        es.close();
        esRef.current = null;

        const delay = retryDelay.current;
        retryDelay.current = Math.min(delay * 2, 30000);

        retryTimer.current = setTimeout(() => {
          connect();
        }, delay);
      };
    }

    connect();

    return () => {
      esRef.current?.close();
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, [isWebView, shouldConnect]);

  return null;
}
