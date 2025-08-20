import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";

export const registerCard = async (customerKey: string, authKey: string): Promise<void> => {
  await api.post("billing/card", { json: { customerKey, authKey } }).json<ApiResponse<null>>();
};
