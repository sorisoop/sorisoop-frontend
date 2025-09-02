import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useNotifications } from "@/entities/notification/api/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { BackHeaderLayout } from "@/shared/layouts";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/shared/components/ui/badge";
import { useReadNotification } from "@/entities/notification/api/mutations";

export default function NotificationsPage() {
  const { data: notifications } = useNotifications();
  const { mutateAsync: readNotification } = useReadNotification();
  const navigate = useNavigate();

  const handleNotificationClick = async (notificationId: number, customFairyTaleId: number, isUnread: boolean) => {
    if (isUnread) await readNotification(notificationId);
    navigate(`/fairy-tale/custom/${customFairyTaleId}`);
  };

  return (
    <BackHeaderLayout title="알림">
      <div className="flex flex-col divide-y divide-border">
        {notifications.map((notification) => {
          const isUnread = notification.isRead === "F";
          return (
            <div
              key={notification.id}
              role="button"
              className="flex items-center gap-4 py-4 cursor-pointer hover:bg-muted/50"
              onClick={() => handleNotificationClick(notification.id, notification.customFairyTaleId, isUnread)}
            >
              <Avatar className="h-14 w-14">
                <AvatarImage src={notification.thumbnailImage} alt={notification.title} className="rounded-full" />
                <AvatarFallback className="rounded-md bg-muted text-xs">{notification.title.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <span className="text-base font-semibold">{notification.title}</span>
                <span className="text-sm text-muted-foreground">{notification.content}</span>
                <span className="text-xs text-foreground">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  }).replace(/^약\s/, "")}
                </span>
              </div>
              {isUnread && (
                <Badge variant="destructive" className="!text-xs">
                  NEW
                </Badge>
              )}{" "}
            </div>
          );
        })}
      </div>
    </BackHeaderLayout>
  );
}
