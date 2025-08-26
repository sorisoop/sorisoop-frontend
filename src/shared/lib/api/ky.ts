import ky from "ky";
import {
  AuthApiError,
  AuthError,
  MemberApiError,
  MemberError,
  SubscriptionApiError,
  SubscriptionError,
  type AuthErrorCode,
  type MemberErrorCode,
  type SubscriptionErrorCode,
} from "./errors";
import { refreshAccessToken } from "@/entities/auth/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function redirectToLogin() {
  window.location.href = "/auth/login";
}

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  timeout: 10000,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => null);
        const status = cloned.status;

        if (!response.ok && data) {
          const code = data.code as string;

          if (code && code in AuthError) {
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

            throw new AuthApiError(code as AuthErrorCode, response.status);
          }

          if (code && code in MemberError) {
            throw new MemberApiError(code as MemberErrorCode, response.status);
          }

          if (code && code in SubscriptionError) {
            throw new SubscriptionApiError(code as SubscriptionErrorCode, response.status);
          }

          throw new Error(data.message ?? "알 수 없는 오류가 발생했습니다.");
        }

        return response;
      },
    ],
  },
});
