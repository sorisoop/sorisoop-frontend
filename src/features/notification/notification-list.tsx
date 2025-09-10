import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useNotifications } from "@/entities/notification/api/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { useReadNotification } from "@/entities/notification/api/mutations";
import { NotificationListEmpty } from "@/features/notification";
import { toast } from "sonner";

export default function NotificationList() {
  const { data: notifications } = useNotifications();
  const { mutateAsync: readNotification } = useReadNotification();
  const navigate = useNavigate();

  if (!notifications || notifications.length === 0) {
    return <NotificationListEmpty />;
  }

  const handleNotificationClick = async (
    notificationId: number,
    customFairyTaleId: number,
    isUnread: boolean,
    isDeleted: boolean
  ) => {
    if (isDeleted) {
      toast.error("이미 삭제된 동화책입니다.", {
        position: "top-right",
      });
      return;
    }

    if (isUnread) await readNotification(notificationId);
    navigate(`/fairy-tale/custom/${customFairyTaleId}`);
  };

  return (
    <div className="flex flex-col divide-y divide-border">
      {notifications.map((notification) => {
        const isUnread = notification.isRead === "F";
        const isDeleted = notification.customFairyTaleIsDelete === "T";

        return (
          <div
            key={notification.id}
            role="button"
            className={`relative flex items-center gap-4 py-4 cursor-pointer px-2 overflow-hidden ${
              isDeleted ? "opacity-60 !cursor-not-allowed pointer-events-none" : "hover:bg-muted/50"
            }`}
            onClick={() =>
              handleNotificationClick(notification.id, notification.customFairyTaleId, isUnread, isDeleted)
            }
          >
            <Avatar className="h-14 w-14">
              <AvatarImage src={notification.thumbnailImage} alt={notification.title} className="rounded-full" />
              <AvatarFallback className="rounded-md bg-muted text-xs">{notification.title.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-base font-semibold">{notification.title}</span>
              <span className={`text-sm ${isDeleted ? "line-through text-muted-foreground" : "text-muted-foreground"}`}>
                {notification.content}
              </span>
              <span className="text-xs text-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                  locale: ko,
                }).replace(/^약\s/, "")}
              </span>
            </div>
            {isDeleted && (
              <span className="absolute top-1/2 right-4 -translate-y-1/2 rotate-[-15deg] text-xs font-bold uppercase tracking-widest text-destructive border-2 border-destructive px-2 py-0.5 rounded-md">
                삭제
              </span>
            )}

            {isUnread && !isDeleted && (
              <Badge variant="destructive" className="!text-xs ml-2">
                NEW
              </Badge>
            )}
          </div>
        );
      })}
    </div>
  );
}
