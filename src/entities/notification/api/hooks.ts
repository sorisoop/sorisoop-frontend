import { useSuspenseQuery } from "@tanstack/react-query";
import { notificationQueryOptions } from "./query-optionts";

export const useNotificationStatus = (displayMode: "toast" | "fallback" = "fallback"): boolean => {
  const { data } = useSuspenseQuery<string>(notificationQueryOptions.getStatus(displayMode));
  return data === "T";
};
