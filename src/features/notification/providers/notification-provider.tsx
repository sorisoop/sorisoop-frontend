import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { WebViewFacade, useWebViewMessage, type AppToWebMessage } from "@/shared/webview";
import { NotificationContext } from "@/features/notification/contexts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const { isWebView } = useIsWebview();

  useWebViewMessage((msg: AppToWebMessage) => {
    switch (msg.type) {
      case "NOTIFICATION_PERMISSION_RESULT":
        setEnabled(msg.granted);
        break;
    }
  });

  useEffect(() => {
    if (isWebView) WebViewFacade.checkNotificationPermission();
  }, [isWebView]);

  useEffect(() => {
    const es = new EventSource(`${API_BASE_URL}/notifications/stream`, {
      withCredentials: true,
    });

    es.onmessage = (e) => {
      if (!enabled) return;
      const data = JSON.parse(e.data);
      const msg = data.message ?? "새 알림";

      setMessages((prev) => [...prev, msg]);

      if (!isWebView) {
        toast.success(msg);
      } else {
        WebViewFacade.sendNotification(msg);
      }
    };

    es.onerror = () => {
      es.close();
    };

    return () => {
      es.close();
    };
  }, [enabled, isWebView]);

  return (
    <NotificationContext.Provider value={{ enabled, setEnabled, messages }}>{children}</NotificationContext.Provider>
  );
}
