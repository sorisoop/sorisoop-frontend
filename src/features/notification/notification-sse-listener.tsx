import { useEffect } from "react";
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

  useEffect(() => {
    if (!shouldConnect) return;

    const es = new EventSource(`${API_BASE_URL}/notifications/subscribe`, {
      withCredentials: true,
    });

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const msg = data.message ?? "새 알림";

      if (isWebView) {
        WebViewFacade.sendNotification(msg);
      } else {
        toast.success(msg);
      }
    };

    es.onerror = () => {
      es.close();
    };

    return () => {
      es.close();
    };
  }, [isWebView, shouldConnect]);

  return null;
}
