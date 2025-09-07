import { BaseApiError } from "./base-api-error";

export const MissionError = {
  MI001: {
    code: "MI001",
    message: "부모 프로필이 아닙니다.",
    userMessage: "부모 계정에서만 이용할 수 있는 기능이에요.",
  },
  MI002: {
    code: "MI002",
    message: "시작일은 오늘 날짜보다 전일 수 없습니다.",
    userMessage: "시작일은 오늘 이후로만 설정할 수 있어요.",
  },
  MI103: {
    code: "MI103",
    message: "미션 등록을 실패했습니다.",
    userMessage: "미션을 등록하지 못했어요. 다시 시도해주세요.",
  },
  MI104: {
    code: "MI104",
    message: "미션 조회를 실패했습니다.",
    userMessage: "미션을 불러오지 못했어요. 잠시 후 다시 시도해주세요.",
  },
} as const;

export type MissionErrorCode = keyof typeof MissionError;

export class MissionApiError extends BaseApiError {
  constructor(code: MissionErrorCode, status: number) {
    const { message, userMessage } = MissionError[code];
    super(code, status, message, userMessage);
  }
}
