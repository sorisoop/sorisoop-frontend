import { useQuery } from "@tanstack/react-query";
import { notificationQueryOptions } from "./query-optionts";
import { BaseApiError } from "@/shared/lib/api/errors";

export const useNotificationStatus = (displayMode: "toast" | "fallback" = "fallback"): boolean => {
  const { data, error } = useQuery<string>(notificationQueryOptions.getStatus(displayMode));

  // 401 → 로그인 안된 상태 → false 리턴
  if (error instanceof BaseApiError && error.status === 401) {
    return false;
  }

  return data === "T";
};
