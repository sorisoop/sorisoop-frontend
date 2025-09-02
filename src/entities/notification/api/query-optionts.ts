import { getNotificationStatus, getUnreadNotifications } from "./get";

export const notificationKeys = {
  getStatus: ["notification", "status"] as const,
  getUnread: ["notification", "unread"] as const,
};

export const notificationQueryOptions = {
  getStatus: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: notificationKeys.getStatus,
    queryFn: () => getNotificationStatus(displayMode),
    staleTime: Infinity,
    gcTime: Infinity,
  }),

  getUnread: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: notificationKeys.getUnread,
    queryFn: () => getUnreadNotifications(displayMode),
    staleTime: 0,
    gcTime: 0,
  }),
};
