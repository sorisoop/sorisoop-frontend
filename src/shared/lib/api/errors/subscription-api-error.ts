import { BaseApiError } from "./base-api-error";

export const SubscriptionError = {
  SU001: {
    code: "SU001",
    devMessage: "해당하는 구독 플랜이 존재하지 않습니다.",
    message: "해당하는 구독 플랜이 존재하지 않습니다.",
  },
  SU002: {
    code: "SU002",
    devMessage: "구독 생성에 실패했습니다.",
    message: "구독 생성에 실패했습니다.",
  },
  SU003: {
    code: "SU003",
    devMessage: "기존 구독 정보를 찾을 수 없습니다.",
    message: "구독 정보를 찾을 수 없습니다.",
  },
  SU004: {
    code: "SU004",
    devMessage: "올바르지 않은 상태입니다.",
    message: "올바르지 않은 상태입니다.",
  },
  SU005: {
    code: "SU005",
    devMessage: "구독을 재시작하려면 새 결제가 필요합니다.",
    message: "구독을 재시작하려면 새 결제가 필요합니다.",
  },
  SU006: {
    code: "SU006",
    devMessage: "결제 수단 등록 중 문제가 발생했습니다.",
    message: "결제 수단 등록 중 문제가 발생했습니다.",
  },
  SU007: {
    code: "SU007",
    devMessage: "결제 처리 중 오류",
    message: "결제 처리에 실패했습니다.",
  },
  SU009: {
    code: "SU009",
    devMessage: "브랜드페이 처리 중 알 수 없는 오류",
    message: "브랜드페이 처리 중 알 수 없는 오류가 발생했습니다.",
  },
  SU010: {
    code: "SU010",
    devMessage: "이미 활성화된 구독이 존재합니다.",
    message: "이미 활성화된 구독이 존재합니다.",
  },
  SU011: {
    code: "SU011",
    devMessage: "구독 해지 처리 실패",
    message: "구독 해지 처리에 실패했습니다.",
  },
  SU012: {
    code: "SU012",
    devMessage: "구독 상태 변경 실패",
    message: "구독 상태 변경에 실패했습니다.",
  },
  SU013: {
    code: "SU013",
    devMessage: "비활성 구독",
    message: "구독이 필요한 기능입니다.",
  },
} as const;

export type SubscriptionErrorCode = keyof typeof SubscriptionError;

export class SubscriptionApiError extends BaseApiError {
  constructor(code: SubscriptionErrorCode, status: number) {
    const { message } = SubscriptionError[code];
    super(code, message, status);
  }
}
