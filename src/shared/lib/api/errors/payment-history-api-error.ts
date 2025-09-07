import { BaseApiError } from "./base-api-error";

export const PaymentHistoryError = {
  PA001: {
    code: "PA001",
    message: "결제 이력 저장에 실패했습니다.",
    userMessage: "결제 정보를 저장하지 못했어요. 잠시 후 다시 시도해주세요.",
  },
} as const;

export type PaymentHistoryErrorCode = keyof typeof PaymentHistoryError;

export class PaymentHistoryApiError extends BaseApiError {
  constructor(code: PaymentHistoryErrorCode, status: number) {
    const { message, userMessage } = PaymentHistoryError[code];
    super(code, status, message, userMessage);
  }
}
