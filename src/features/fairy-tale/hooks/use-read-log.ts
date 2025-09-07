import { saveReadLog } from "@/entities/log/api/create";
import { useCallback } from "react";

export const useReadLog = (fairyTaleType: "FAIRY_TALE" | "CUSTOM_FAIRY_TALE", bookId: number) => {
  const logPage = useCallback(
    (pageIndex: number) => {
      void saveReadLog({
        fairyTaleType,
        bookId,
        page: pageIndex + 1,
      });
    },
    [fairyTaleType, bookId]
  );

  return { logPage };
};
