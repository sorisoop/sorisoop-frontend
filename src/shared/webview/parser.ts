import type { WebToAppMessage, AppToWebMessage } from "./types";

export const serializeMessage = (msg: WebToAppMessage | AppToWebMessage) => JSON.stringify(msg);

export const parseMessage = (raw: string): WebToAppMessage | AppToWebMessage | null => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
