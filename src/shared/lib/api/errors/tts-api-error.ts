import { BaseApiError } from "./base-api-error";

export const TtsError = {
  TS001: {
    code: "TS001",
    message: "일반 동화를 찾을 수 없습니다.",
    userMessage: "해당 동화를 찾을 수 없어요.",
  },
  TS002: {
    code: "TS002",
    message: "사용자 정의 동화를 찾을 수 없습니다.",
    userMessage: "내가 만든 동화를 불러올 수 없어요.",
  },
  TS003: {
    code: "TS003",
    message: "잘못된 페이지 요청입니다.",
    userMessage: "페이지 요청이 잘못되었어요.",
  },
  TS004: {
    code: "TS004",
    message: "잘못된 요청 데이터입니다.",
    userMessage: "보낸 데이터가 올바르지 않아요.",
  },
  TS005: {
    code: "TS005",
    message: "Python 서버 응답이 없습니다.",
    userMessage: "음성을 생성하는 서버가 응답하지 않아요. 잠시 후 다시 시도해주세요.",
  },
  TS006: {
    code: "TS006",
    message: "Python 서버 처리 중 오류가 발생했습니다.",
    userMessage: "음성을 생성하는 서버에서 오류가 발생했어요.",
  },
  TS007: {
    code: "TS007",
    message: "TTS 생성에 실패했습니다.",
    userMessage: "음성을 만들지 못했어요. 다시 시도해주세요.",
  },
  TS008: {
    code: "TS008",
    message: "TTS 오디오를 가져오지 못했습니다.",
    userMessage: "생성된 음성을 불러오지 못했어요.",
  },
} as const;

export type TtsErrorCode = keyof typeof TtsError;

export class TtsApiError extends BaseApiError {
  constructor(code: TtsErrorCode, status: number) {
    const { message, userMessage } = TtsError[code];
    super(code, status, message, userMessage);
  }
}
