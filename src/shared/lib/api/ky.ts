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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  timeout: 10000,
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => null);

        if (!response.ok && data) {
          const code = data.code as string;

          if (code && code in AuthError) {
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

// 액세스토큰 만료 AU010
// 리프레시 일때 AU003 ->
// 토큰발급 AU004 -> 로그인다시 시켜야됨 (디비문제일거다.)
