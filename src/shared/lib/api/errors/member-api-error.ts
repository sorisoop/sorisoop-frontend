import { BaseApiError } from "./base-api-error";

export const MemberError = {
  ME000: {
    code: "ME000",
    message: "회원 없음",
    userMessage: "회원을 찾을 수 없습니다.",
  },
  ME001: {
    code: "ME001",
    message: "회원가입 실패",
    userMessage: "회원가입에 실패했습니다.",
  },
  ME002: {
    code: "ME002",
    message: "중복 회원",
    userMessage: "이미 존재하는 회원입니다.",
  },
  ME003: {
    code: "ME003",
    message: "고객 키 생성 실패",
    userMessage: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  ME004: {
    code: "ME004",
    message: "고객 키 업데이트 실패",
    userMessage: "요청을 처리하는 중 문제가 발생했습니다.",
  },
} as const;

export type MemberErrorCode = keyof typeof MemberError;

export class MemberApiError extends BaseApiError {
  constructor(code: MemberErrorCode, status: number) {
    const { message, userMessage } = MemberError[code];
    super(code, status, message, userMessage);
  }
}
