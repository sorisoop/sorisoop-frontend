import { useCallback, useEffect, useState } from "react";
import type { MicPermissionStatus, UseMicrophonePermission } from "../types";

/**
 * 브라우저 환경에서 마이크 권한 상태를 관리하는 훅
 *
 * 기능:
 * - 현재 환경이 MediaDevices API(getUserMedia)를 지원하는지 여부 확인
 * - Permissions API를 사용해 마이크 권한 상태 조회
 * - getUserMedia를 호출하여 마이크 권한 요청
 * - 권한 상태를 내부 state로 유지 및 업데이트
 *
 * 사용 예시:
 * const { status, requestPermission } = useMicrophonePermission();
 * if (status === "granted") { ... }
 */

export const useMicrophonePermission = (): UseMicrophonePermission => {
  /**
   * 1. navigator 객체가 존재하는지 (SSR 대비)
   * 2. navigator.mediaDevices 객체가 존재하는지
   * 3. navigator.mediaDevices.getUserMedia 메서드가 함수 형태로 존재하는지
   */
  const isMediaDevicesSupported =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function";

  const [status, setStatus] = useState<MicPermissionStatus>("unknown");

  /* Permission API 마이크 권한 상태 조회  */
  const queryPermission = useCallback(async (): Promise<MicPermissionStatus> => {
    if (!("permissions" in navigator)) return status;

    try {
      const permissionResult = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });

      const mappedStatus: MicPermissionStatus =
        permissionResult.state === "granted" ? "granted" : permissionResult.state === "denied" ? "denied" : "prompt";

      setStatus(mappedStatus);
      return mappedStatus;
    } catch {
      return status;
    }
  }, [status]);

  /* 마이크 권한 요청 */
  const requestPermission = useCallback(async (): Promise<MicPermissionStatus> => {
    if (!isMediaDevicesSupported) {
      setStatus("denied");
      return "denied";
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());

      setStatus("granted");
      return "granted";
    } catch {
      setStatus("denied");
      return "denied";
    }
  }, [isMediaDevicesSupported]);

  useEffect(() => {
    void queryPermission();
  }, [queryPermission]);

  return {
    isMediaDevicesSupported,
    status,
    queryPermission,
    requestPermission,
  };
};
