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

export const getProfile = async (displayMode: "toast" | "fallback" = "fallback"): Promise<ProfileResponse> => {
  try {
    const res = await api.get("profiles/details").json<ApiResponse<ProfileResponse>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

export const getChildrenProfiles = async (): Promise<ProfileResponse[]> => {
  const all = await getProfiles("toast");
  return all.filter((profile) => profile.role === "CHILD");
};
