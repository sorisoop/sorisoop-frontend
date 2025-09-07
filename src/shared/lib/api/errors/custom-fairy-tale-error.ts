import { BaseApiError } from "./base-api-error";

export const CustomFairyTaleError = {
  CF000: {
    code: "CF000",
    message: "이미지가 존재하지 않습니다.", // 백엔드 원본 에러 메시지 (dev 확인용)
    userMessage: "업로드된 이미지가 없습니다. 다시 시도해주세요.", // 사용자 친화적 메시지
  },
  CF001: {
    code: "CF001",
    message: "스크립트 생성 결과가 존재하지 않습니다.",
    userMessage: "동화 스크립트를 생성하지 못했습니다. 잠시 후 다시 시도해주세요.",
  },
  CF002: {
    code: "CF002",
    message: "캐릭터 특징 추출 결과가 존재하지 않습니다.",
    userMessage: "캐릭터 정보를 분석하지 못했습니다. 다른 이미지를 시도해보세요.",
  },
  CF003: {
    code: "CF003",
    message: "동화 이미지 생성을 실패했습니다.",
    userMessage: "동화 이미지를 만들지 못했습니다. 잠시 후 다시 시도해주세요.",
  },
  CF004: {
    code: "CF004",
    message: "동화 시놉시스 생성을 실패했습니다.",
    userMessage: "동화 줄거리를 만들지 못했습니다. 잠시 후 다시 시도해주세요.",
  },
  CF005: {
    code: "CF005",
    message: "생성 동화 저장을 실패했습니다.",
    userMessage: "만든 동화를 저장하지 못했습니다. 다시 시도해주세요.",
  },
  CF006: {
    code: "CF006",
    message: "생성 동화 내용 저장을 실패했습니다.",
    userMessage: "동화 내용을 저장하지 못했습니다. 다시 시도해주세요.",
  },
  CF007: {
    code: "CF007",
    message: "생성 동화 내용 조회를 실패했습니다.",
    userMessage: "동화 내용을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  },
  CF008: {
    code: "CF008",
    message: "생성 동화 상세 조회를 실패했습니다.",
    userMessage: "동화 상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
  },
  CF009: {
    code: "CF009",
    message: "생성 동화 삭제를 실패했습니다.",
    userMessage: "동화를 삭제하지 못했습니다. 다시 시도해주세요.",
  },
} as const;

export type CustomFairyTaleErrorCode = keyof typeof CustomFairyTaleError;

export class CustomFairyTaleApiError extends BaseApiError {
  constructor(code: CustomFairyTaleErrorCode, status: number) {
    const { message, userMessage } = CustomFairyTaleError[code];
    super(code, status, message, userMessage);
  }
}
