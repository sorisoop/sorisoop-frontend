import type { AddProfileFormSubmit } from "@/features/profile/components/profile-add-form";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";
import { api } from "@/shared/lib/api/ky";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";

/**
 * 프로필 수정 API
 * @param data - 수정 요청 DTO
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const updateProfile = async (
  data: AddProfileFormSubmit & { id: number },
  displayMode: DisplayMode = "toast"
): Promise<null> => {
  try {
    const formData = new FormData();
    if (data.file) {
      formData.append("profileImage", data.file);
    }
    formData.append("profileId", String(data.id));
    formData.append("nickname", data.nickname);
    formData.append("role", data.role);
    formData.append("age", String(data.age));
    formData.append("gender", data.gender);

    const res = await api.patch("profiles", { body: formData }).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
