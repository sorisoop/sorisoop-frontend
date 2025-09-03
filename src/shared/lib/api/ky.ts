import ky from "ky";
import { refreshAccessToken } from "@/entities/auth/api";
import {
  AuthApiError,
  AuthError,
  CustomFairyTaleApiError,
  CustomFairyTaleError,
  MemberApiError,
  MemberError,
  SubscriptionApiError,
  SubscriptionError,
  type AuthErrorCode,
  type CustomFairyTaleErrorCode,
  type MemberErrorCode,
  type SubscriptionErrorCode,
} from "./errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function redirectToLogin() {
  window.location.href = "/auth/login";
}

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  timeout: 20000,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => null);
        const status = cloned.status;

        if (!response.ok && data) {
          const code = data.code as string;

          // 🔹 AuthError 처리
          if (code && code in AuthError) {
            if (code === "AU010") {
              const success = await refreshAccessToken();
              if (success) {
                return ky(request, options);
              } else {
                redirectToLogin();
                throw new AuthApiError(code as AuthErrorCode, status);
              }
            }

            if (code === "AU000" || code === "AU002" || code === "AU003" || code === "AU004") {
              redirectToLogin();
              throw new AuthApiError(code as AuthErrorCode, status);
            }

            throw new AuthApiError(code as AuthErrorCode, status);
          }

          if (code && code in MemberError) {
            throw new MemberApiError(code as MemberErrorCode, status);
          }
          if (code && code in SubscriptionError) {
            throw new SubscriptionApiError(code as SubscriptionErrorCode, status);
          }

          if (code && code in CustomFairyTaleError) {
            throw new CustomFairyTaleApiError(code as CustomFairyTaleErrorCode, status);
          }

          throw new Error(data.message ?? "알 수 없는 오류가 발생했습니다.");
        }

        return response;
      },
    ],
  },
});
