import type { WebToAppMessage } from "./types";

/**
 * 앱(WebView 네이티브)으로 메시지를 전송하는 함수
 *
 * @param msg WebToAppMessage 타입의 메시지
 */
export const postToApp = (msg: WebToAppMessage) => {
  const serialized = JSON.stringify(msg);

  if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === "function") {
    window.ReactNativeWebView.postMessage(serialized);
  } else {
    console.warn("[WebViewBridge] Tried to send message outside of WebView:", msg);
  }
};
