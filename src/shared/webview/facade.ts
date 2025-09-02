import { postToApp } from "./bridge";

/**
 * WebView와의 통신을 단순화한 Facade
 *
 * 컴포넌트에서는 postToApp을 직접 호출하지 않고,
 * 이 Facade의 메서드를 통해 메시지를 보낸다.
 */
export const WebViewFacade = {
  // 녹음
  startRecording() {
    postToApp({ type: "START_RECORD" });
  },

  stopRecording() {
    postToApp({ type: "STOP_RECORD" });
  },

  resetRecording() {
    postToApp({ type: "RESET_RECORD" });
  },

  sendNotification(message: string) {
    postToApp({ type: "NOTIFICATION", message });
  },

  requestNotificationPermission() {
    postToApp({ type: "REQUEST_NOTIFICATION_PERMISSION" });
  },

  checkNotificationPermission() {
    postToApp({ type: "CHECK_NOTIFICATION_PERMISSION" });
  },
};
