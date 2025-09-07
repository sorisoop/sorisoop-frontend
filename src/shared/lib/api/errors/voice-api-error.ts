import { BaseApiError } from "./base-api-error";

export const VoiceError = {
  VO000: {
    code: "VO000",
    message: "S3 파일 업로드 실패",
    userMessage: "파일을 업로드하지 못했어요. 다시 시도해주세요.",
  },
  VO001: {
    code: "VO001",
    message: "업로드 가능한 파일 크기를 초과했습니다.",
    userMessage: "파일 크기가 너무 커요. 더 작은 파일을 올려주세요.",
  },
  VO002: {
    code: "VO002",
    message: "목소리 정보 수정 실패",
    userMessage: "목소리 정보를 수정하지 못했어요. 잠시 후 다시 시도해주세요.",
  },
  VO003: {
    code: "VO003",
    message: "존재하지 않는 목소리입니다.",
    userMessage: "해당 목소리를 찾을 수 없어요.",
  },
  VO004: {
    code: "VO004",
    message: "목소리 등록 실패",
    userMessage: "목소리를 등록하지 못했어요. 다시 시도해주세요.",
  },
  VO005: {
    code: "VO005",
    message: "S3 목소리 파일 삭제 실패",
    userMessage: "목소리 파일을 삭제하지 못했어요.",
  },
  VO006: {
    code: "VO006",
    message: "DB 목소리 삭제 실패",
    userMessage: "목소리 정보를 삭제하지 못했어요.",
  },
} as const;

export type VoiceErrorCode = keyof typeof VoiceError;

export class VoiceApiError extends BaseApiError {
  constructor(code: VoiceErrorCode, status: number) {
    const { message, userMessage } = VoiceError[code];
    super(code, status, message, userMessage);
  }
}
