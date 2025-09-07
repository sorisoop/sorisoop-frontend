import { BaseApiError } from "./base-api-error";

export const SubscriptionError = {
  SU001: {
    code: "SU001",
    message: "해당하는 구독 플랜이 존재하지 않습니다.",
    userMessage: "선택한 구독 플랜을 찾을 수 없습니다.",
  },
  SU002: {
    code: "SU002",
    message: "구독 생성에 실패했습니다.",
    userMessage: "구독 생성 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.",
  },
  SU003: {
    code: "SU003",
    message: "기존 구독 정보를 찾을 수 없습니다.",
    userMessage: "구독 정보를 불러오지 못했습니다.",
  },
  SU004: {
    code: "SU004",
    message: "올바르지 않은 상태입니다.",
    userMessage: "구독 상태가 올바르지 않아요. 다시 시도해주세요.",
  },
  SU005: {
    code: "SU005",
    message: "구독을 재시작하려면 새 결제가 필요합니다.",
    userMessage: "구독을 다시 시작하려면 새로운 결제가 필요합니다.",
  },
  SU006: {
    code: "SU006",
    message: "결제 수단 등록 중 문제가 발생했습니다.",
    userMessage: "결제 수단을 등록하지 못했습니다. 다시 시도해주세요.",
  },
  SU007: {
    code: "SU007",
    message: "결제 처리에 실패했습니다.",
    userMessage: "결제를 완료하지 못했어요. 다시 시도해주세요.",
  },
  SU009: {
    code: "SU009",
    message: "브랜드페이 처리 중 알 수 없는 오류가 발생했습니다.",
    userMessage: "결제 중 알 수 없는 문제가 발생했어요. 다시 시도해주세요.",
  },
  SU010: {
    code: "SU010",
    message: "이미 활성화된 구독이 존재합니다.",
    userMessage: "이미 활성화된 구독이 있어요.",
  },
  SU011: {
    code: "SU011",
    message: "구독 해지 처리에 실패했습니다.",
    userMessage: "구독을 해지하지 못했습니다. 잠시 후 다시 시도해주세요.",
  },
  SU012: {
    code: "SU012",
    message: "구독 상태 변경에 실패했습니다.",
    userMessage: "구독 상태를 변경하지 못했어요.",
  },
  SU013: {
    code: "SU013",
    message: "비활성 구독",
    userMessage: "구독이 필요한 기능이에요.",
  },
} as const;

export type SubscriptionErrorCode = keyof typeof SubscriptionError;

export class SubscriptionApiError extends BaseApiError {
  constructor(code: SubscriptionErrorCode, status: number) {
    const { message, userMessage } = SubscriptionError[code];
    super(code, status, message, userMessage);
  }
}
