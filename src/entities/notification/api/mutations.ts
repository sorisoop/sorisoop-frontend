import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification, updateNotificationStatus } from "./update";
import { notificationKeys } from "./query-optionts";

export const useUpdateNotificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateNotificationStatus("toast"),
    meta: { displayMode: "toast" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.getStatus });
    },
  });
};

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => readNotification(notificationId),
    meta: { displayMode: "toast" },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.getNotifications });
    },
  });
}
