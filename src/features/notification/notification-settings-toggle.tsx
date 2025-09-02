import { toast } from "sonner";
import { Switch } from "@/shared/components/ui/switch";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { useWebViewMessage, WebViewFacade, type AppToWebMessage } from "@/shared/webview";
import { useNotificationStatus } from "@/entities/notification/api/hooks";
import { useUpdateNotificationStatus } from "@/entities/notification/api/mutations";

export default function NotificationSettingsToggle() {
  const { isWebView } = useIsWebview();
  const enabled = useNotificationStatus();
  const { mutate: toggleNotification } = useUpdateNotificationStatus();

  useWebViewMessage((msg: AppToWebMessage) => {
    if (msg.type === "NOTIFICATION_PERMISSION_RESULT") {
      if (msg.granted) toggleNotification();
      else toast.error("알림 권한이 거부되어 알림을 켤 수 없습니다");
    }
  });

  const handleToggle = (next: boolean) => {
    if (!isWebView) {
      toast.info("웹에서는 알림 설정을 변경할 수 없습니다");
      return;
    }

    if (next) WebViewFacade.requestNotificationPermission();
    else toggleNotification();
  };

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex flex-col">
        <span className="text-base font-semibold">알림 설정</span>
        <span className="text-xs text-muted-foreground mt-1">서버에서 보내는 실시간 알림을 받아보세요.</span>
      </div>
      <Switch checked={enabled} onCheckedChange={handleToggle} disabled={!isWebView} />
    </div>
  );
}
