import { BellOff } from "lucide-react";

export default function NotificationListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[calc(100dvh-52px)] gap-3">
      <BellOff className="h-10 w-10 text-muted-foreground/70" />
      <span className="text-base">새로운 알림이 없습니다</span>
    </div>
  );
}
