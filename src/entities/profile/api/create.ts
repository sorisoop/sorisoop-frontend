// features/profile/api/create.ts
import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";
import type { AddProfileFormSubmit } from "@/features/profile/components/profile-add-form";

/**
 * 프로필 추가 API
 * @param data - 프로필 추가 요청 DTO
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const createProfile = async (data: AddProfileFormSubmit, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const formData = new FormData();
    if (data.file) {
      formData.append("profileImage", data.file);
    }
    formData.append("nickname", data.nickname);
    formData.append("role", data.role);
    formData.append("age", String(data.age));
    formData.append("gender", data.gender);

    if (data.role === "PARENT" && data.password) {
      formData.append("password", data.password);
    }

    const res = await api.post("profiles", { body: formData }).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
