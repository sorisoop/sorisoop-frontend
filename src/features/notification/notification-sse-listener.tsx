import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { WebViewFacade } from "@/shared/webview";
import { EventSourcePolyfill } from "event-source-polyfill";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function NotificationSseListener() {
  const { isWebView } = useIsWebview();
  const location = useLocation();

  const disabledPaths = ["/auth/login", "/auth/signup", "/profile"];
  const shouldConnect = !disabledPaths.includes(location.pathname);

  useEffect(() => {
    if (!shouldConnect) return;

    const es = new EventSourcePolyfill(`${API_BASE_URL}/notifications/subscribe`, {
      withCredentials: true,
    });

    es.addEventListener("make-fairy-tale-complete", (e) => {
      const data = (e as MessageEvent).data;

      if (isWebView) {
        WebViewFacade.sendNotification(data);
      } else {
        toast.success(`동화 생성 완료 🎉 ${data}`);
      }
    });

    es.onerror = () => {
      es.close();
    };

    return () => {
      es.close();
    };
  }, [isWebView, shouldConnect]);

  return null;
}
