export type WebToAppMessage =
  | { type: "START_RECORD" }
  | { type: "STOP_RECORD" }
  | { type: "RESET_RECORD" }
  | { type: "NOTIFICATION"; message: string }
  | { type: "REQUEST_NOTIFICATION_PERMISSION" }
  | { type: "CHECK_NOTIFICATION_PERMISSION" }
  | { type: "KAKAO_LOGIN" }
  | { type: "KAKAO_LOGIN" };

export type AppToWebMessage =
  | { type: "RECORD_STARTED" }
  | {
      type: "RECORD_COMPLETE";
      fileUri: string;
      fileBase64: string;
      mimeType: string;
    }
  | { type: "RECORD_ERROR"; message: string }
  | { type: "NOTIFICATION_PERMISSION_RESULT"; granted: boolean }
  | { type: "KAKAO_LOGIN_RESULT"; success: boolean; error?: string };
