import { getNotificationStatus } from "./get";

export const notificationKeys = {
  getStatus: ["notification", "status"] as const,
};

export const notificationQueryOptions = {
  getStatus: (displayMode: "toast" | "fallback" = "toast") => ({
    queryKey: notificationKeys.getStatus,
    queryFn: () => getNotificationStatus(displayMode),
    staleTime: 0,
    gcTime: 0,
  }),
};
