import { useEffect } from "react";
import { parseMessage } from "./parser";
import type { AppToWebMessage } from "./types";

export const useWebViewMessage = (onMessage: (msg: AppToWebMessage) => void) => {
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const msg = parseMessage(e.data);
      if (msg && "type" in msg) {
        onMessage(msg as AppToWebMessage);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onMessage]);
};
