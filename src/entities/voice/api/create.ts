import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import type { AddVoicePayload } from "../model";
import { api } from "@/shared/lib/api/ky";
import { BaseApiError } from "@/shared/lib/api/errors";

export const addVoice = async (
  voiceFile: File,
  request: AddVoicePayload,
  displayMode: "toast" | "fallback" = "toast"
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("voice", voiceFile);
    formData.append("request", JSON.stringify(request));

    await api.post("voices", { body: formData }).json<ApiResponse<null>>();
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
