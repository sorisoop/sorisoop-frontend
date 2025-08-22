import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { FairyTaleContentResponse } from "../models";

export const getFairyTaleContents = async (id: string) => {
  const res = await api.get(`fairy-tale/${id}/contents`).json<ApiResponse<FairyTaleContentResponse[]>>();
  return res.data;
};
