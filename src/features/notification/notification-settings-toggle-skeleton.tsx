import { Switch } from "@/shared/components/ui/switch";

export default function NotificationSettingsToggleSkeleton() {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex flex-col">
        <span className="text-base font-semibold">알림 설정</span>
        <span className="text-xs text-muted-foreground mt-1">서버에서 보내는 실시간 알림을 받아보세요.</span>
      </div>
      <Switch checked={false} disabled />
    </div>
  );
}
