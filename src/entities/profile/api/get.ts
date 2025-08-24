import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { ProfileResponse } from "../model";
import { BaseApiError } from "@/shared/lib/api/errors";

export const getProfiles = async (displayMode: "toast" | "fallback" = "fallback"): Promise<ProfileResponse[]> => {
  try {
    const res = await api.get("profiles").json<ApiResponse<ProfileResponse[]>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
