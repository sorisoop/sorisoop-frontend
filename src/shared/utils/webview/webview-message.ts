export type WebToAppMessage = { type: "START_RECORD" } | { type: "STOP_RECORD" } | { type: "RESET_RECORD" };
export type AppToWebMessage =
  | { type: "RECORD_STARTED" }
  | {
      type: "RECORD_COMPLETE";
      fileUri: string;
      fileBase64: string;
      mimeType: string;
    }
  | { type: "RECORD_ERROR"; message: string };

export const serializeMessage = (msg: WebToAppMessage | AppToWebMessage) => JSON.stringify(msg);

export const parseMessage = (raw: string): WebToAppMessage | AppToWebMessage | null => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
