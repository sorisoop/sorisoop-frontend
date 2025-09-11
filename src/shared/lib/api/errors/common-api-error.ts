import { BaseApiError } from "./base-api-error";

export const CommonError = {
  ER000: {
    code: "ER000",
    message: "알 수 없는 서버 오류",
    userMessage: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  },
  VE000: {
    code: "VE000",
    message: "유효성 검증 실패",
    userMessage: "입력값을 확인해주세요.",
  },
} as const;

export type CommonErrorCode = keyof typeof CommonError;

export class CommonApiError extends BaseApiError {
  constructor(code: CommonErrorCode, status: number) {
    const { message, userMessage } = CommonError[code];
    super(code, status, message, userMessage);
  }
}
