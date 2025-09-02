import { getNotifications, getNotificationStatus, getUnreadNotifications } from "./get";

export const notificationKeys = {
  getStatus: ["notification", "status"] as const,
  getUnread: ["notification", "unread"] as const,
  getNotifications: ["notifications"] as const,
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

  getNotifications: (displayMode: "toast" | "fallback" = "fallback") => ({
    queryKey: notificationKeys.getNotifications,
    queryFn: () => getNotifications(displayMode),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  }),
};
