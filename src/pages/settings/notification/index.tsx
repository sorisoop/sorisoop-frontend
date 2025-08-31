import { useState } from "react";
import { BackHeaderLayout } from "@/shared/layouts";
import { Switch } from "@/shared/components/ui/switch";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { toast } from "sonner"; // 예시: 토스트 라이브러리

export default function NotificationSettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const { isWebView } = useIsWebview();

  const handleToggle = (next: boolean) => {
    if (isWebView) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "PUSH_SETTING", enabled: next }));
      setPushEnabled(next);
    } else {
      toast.error("웹에서는 알림을 지원하지 않아요. 앱에서 이용해주세요.");
      setPushEnabled(false);
    }
  };

  return (
    <BackHeaderLayout title="알림">
      <div className="divide-y divide-border">
        <div className="flex items-center justify-between py-5">
          <div className="flex flex-col">
            <span className="text-base font-semibold">푸시 설정</span>
            <span className="text-xs text-muted-foreground mt-1">
              푸시 알림을 켜주세요. 동화책이 완성되면 알려드립니다.
            </span>
          </div>
          <Switch checked={pushEnabled} onCheckedChange={handleToggle} />
        </div>
      </div>
    </BackHeaderLayout>
  );
}
