import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";

export const deleteSubcription = async (): Promise<null> => {
  const res = await api.delete(`subscription`).json<ApiResponse<null>>();
  return res.data;
};
