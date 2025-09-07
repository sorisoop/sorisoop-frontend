import { BaseApiError } from "./base-api-error";

export const NotificationError = {
  NF000: {
    code: "NF000",
    message: "알림 허용 여부 변경을 실패했습니다.",
    userMessage: "알림 설정을 변경하지 못했어요. 다시 시도해주세요.",
  },
  NF001: {
    code: "NF001",
    message: "알림 읽기를 실패했습니다.",
    userMessage: "알림을 읽는 데 실패했어요. 잠시 후 다시 시도해주세요.",
  },
} as const;

export type NotificationErrorCode = keyof typeof NotificationError;

export class NotificationApiError extends BaseApiError {
  constructor(code: NotificationErrorCode, status: number) {
    const { message, userMessage } = NotificationError[code];
    super(code, status, message, userMessage);
  }
}
