import { BaseApiError } from "./base-api-error";

export const AuthError = {
  AU001: {
    code: "AU001",
    message: "Access Token 오류 또는 일반 로그인 실패",
    userMessage: "아이디 또는 비밀번호가 올바르지 않습니다.",
  },
  AU003: {
    code: "AU003",
    message: "리프레시 토큰 에러",
    userMessage: "로그인 정보가 만료되었습니다. 다시 로그인해주세요.",
  },
  AU004: {
    code: "AU004",
    message: "토큰 발급 실패",
    userMessage: "토큰 발급에 실패했습니다. 잠시 후 다시 시도해주세요.",
  },
  AU010: {
    code: "AU010",
    message: "Access Token 만료",
    userMessage: "로그인 세션이 만료되었습니다. 다시 로그인해주세요.",
  },
} as const;

export type AuthErrorCode = keyof typeof AuthError;

export class AuthApiError extends BaseApiError {
  constructor(code: AuthErrorCode, status: number) {
    const { message, userMessage } = AuthError[code];
    super(code, status, message, userMessage);
  }
}
