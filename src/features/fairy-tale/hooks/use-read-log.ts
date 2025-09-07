import { saveReadLog } from "@/entities/log/api/create";
import { useCallback } from "react";

export const useReadLog = (fairyTaleType: "FAIRY_TALE" | "CUSTOM_FAIRY_TALE", bookId: number) => {
  const logAction = useCallback(
    (pageIndex: number, logType: "READ" | "CREATE" = "READ") => {
      void saveReadLog({
        fairyTaleType,
        bookId,
        page: pageIndex + 1,
        logType,
      });
    },
    [fairyTaleType, bookId]
  );

  return { logAction };
};
