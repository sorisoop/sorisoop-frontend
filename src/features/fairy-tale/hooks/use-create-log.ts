import { saveReadLog } from "@/entities/log/api/create";
import { useCallback } from "react";

export const useCreateLog = () => {
  const logAction = useCallback((fairyTaleType: "FAIRY_TALE" | "CUSTOM_FAIRY_TALE") => {
    void saveReadLog({
      fairyTaleType,
      bookId: null,
      page: null,
      logType: "CREATE",
    });
  }, []);

  return { logAction };
};
