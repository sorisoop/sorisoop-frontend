import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";

export const deleteCreditCard = async (cardId: string): Promise<void> => {
  await api
    .delete("billing/card", {
      searchParams: { cardId },
    })
    .json<ApiResponse<null>>();
};
