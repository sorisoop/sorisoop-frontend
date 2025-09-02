import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationStatus } from "./update";
import { notificationKeys } from "./query-optionts";

export const useUpdateNotificationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateNotificationStatus("toast"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.getStatus });
    },
  });
};
