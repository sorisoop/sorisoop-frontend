import { toast } from "sonner";

import { BackHeaderLayout } from "@/shared/layouts";
import { Switch } from "@/shared/components/ui/switch";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { WebViewFacade } from "@/shared/webview";

export default function NotificationSettingsPage() {
  const { isWebView } = useIsWebview();

  const handleToggle = (next: boolean) => {
    if (!isWebView) {
      toast.info("웹에서는 알림 설정을 변경할 수 없습니다");
      return;
    }

    if (next) WebViewFacade.requestNotificationPermission();
    // else setEnabled();
  };

  return (
    <BackHeaderLayout title="알림">
      <div className="divide-y divide-border">
        <div className="flex items-center justify-between py-5">
          <div className="flex flex-col">
            <span className="text-base font-semibold">알림 설정</span>
            <span className="text-xs text-muted-foreground mt-1">서버에서 보내는 실시간 알림을 받아보세요.</span>
          </div>
          <Switch checked={true} onCheckedChange={handleToggle} disabled={!isWebView} />
        </div>
      </div>
    </BackHeaderLayout>
  );
}
