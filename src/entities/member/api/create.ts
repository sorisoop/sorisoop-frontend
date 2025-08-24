import { api } from "@/shared/lib/api/ky";
import type { SignupRequest } from "../model";
import type { ApiResponse } from "@/shared/lib/model/common-api-response";
import { BaseApiError, type DisplayMode } from "@/shared/lib/api/errors";
import type { LoginSchema } from "@/features/auth/components/login/login-form";

/**
 * 회원가입 API
 * @param data - 회원가입 요청 DTO
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const signup = async (data: SignupRequest, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const res = await api.post("members", { json: data }).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};

/**
 * 로그인 API
 * @param data - 로그인 DTO (email, password)
 * @param displayMode - 에러 발생 시 표시 방식 ("toast" | "fallback")
 */
export const login = async (data: LoginSchema, displayMode: DisplayMode = "toast"): Promise<null> => {
  try {
    const res = await api.post("auth/login", { json: data }).json<ApiResponse<null>>();
    return res.data;
  } catch (err) {
    if (err instanceof BaseApiError) {
      err.displayMode = displayMode;
    }
    throw err;
  }
};
