import notificationBell from "@/lotties/notification-bell.json";
import Lottie from "react-lottie-player";

export default function NotificationListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[calc(100dvh-52px)] gap-3">
      <Lottie animationData={notificationBell} play loop className="h-40 w-40" />
      <span className="text-base">새로운 알림이 없습니다</span>
    </div>
  );
}
