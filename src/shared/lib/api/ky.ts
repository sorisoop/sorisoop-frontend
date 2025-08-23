import ky from "ky";
import { MemberApiError, MemberError, type MemberErrorCode } from "./errors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => null);

        if (!response.ok && data) {
          const code = data.code as MemberErrorCode | undefined;

          if (code && code in MemberError) {
            throw new MemberApiError(code, response.status);
          }

          throw new Error(data.message ?? "알 수 없는 오류가 발생했습니다.");
        }

        return response;
      },
    ],
  },
});
