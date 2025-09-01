import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useIsDeskTop } from "@/shared/hooks";
import { useIsWebview } from "@/shared/hooks/use-is-webview";
import { parseMessage, WebViewFacade, type AppToWebMessage } from "@/shared/webview";
import {
  RecordingDrawerContext,
  type RecordingDrawerContextValue,
} from "@/features/voice/contexts/recording-drawer-context";
import { getSupportedAudioMimeType } from "@/features/voice//utils";
import { useMicrophonePermission, useObjectUrl, useRecordingSessionContext } from "@/features/voice//hooks";
import type { Phase } from "@/features/voice//types";

type RecordingDrawerProviderProps = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
};

export function RecordingDrawerProvider({
  open: controlledOpen,
  onOpenChange,
  children,
}: RecordingDrawerProviderProps) {
  const isDesktop = useIsDeskTop();
  const { isWebView } = useIsWebview();
  const { status, requestPermission, isMediaDevicesSupported } = useMicrophonePermission();
  const session = useRecordingSessionContext();

  /** Drawer 열림 여부 */
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (isControlled) onOpenChange?.(v);
      else setUncontrolledOpen(v);
    },
    [isControlled, onOpenChange]
  );

  const [phase, setPhase] = useState<Phase>("idle");

  const [tempBlob, setTempBlob] = useState<Blob | null>(null);
  const { objectUrl: tempUrl } = useObjectUrl(tempBlob);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const recordedChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = useCallback(async () => {
    if (isWebView) {
      WebViewFacade.startRecording();
      return;
    }

    if (!isMediaDevicesSupported) {
      toast.error("이 브라우저에서는 마이크 녹음을 지원하지 않습니다.");
      return;
    }

    if (status !== "granted") {
      const granted = await requestPermission();
      if (granted !== "granted") {
        toast.error("마이크 권한이 없어 녹음을 시작할 수 없습니다.");
        return;
      }
    }

    setTempBlob(null);
    recordedChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;

    const selectedMimeType = getSupportedAudioMimeType();
    const recorder = new MediaRecorder(stream, selectedMimeType ? { mimeType: selectedMimeType } : undefined);
    mediaRecorderRef.current = recorder;

    recorder.addEventListener("dataavailable", (event: BlobEvent) => {
      if (event.data && event.data.size > 0) recordedChunksRef.current.push(event.data);
    });

    recorder.start();
    setPhase("recording");
  }, [isWebView, isMediaDevicesSupported, status, requestPermission]);

  const stopRecording = useCallback(async () => {
    if (isWebView) {
      WebViewFacade.stopRecording();
      return;
    }

    if (!mediaRecorderRef.current) return;
    await new Promise<void>((resolve) => {
      const recorder = mediaRecorderRef.current!;
      const handleStop = () => {
        recorder.removeEventListener("stop", handleStop);
        resolve();
      };
      recorder.addEventListener("stop", handleStop);
      recorder.stop();
    });

    const mimeType = mediaRecorderRef.current?.mimeType || getSupportedAudioMimeType() || "audio/webm";
    const mergedBlob = new Blob(recordedChunksRef.current, { type: mimeType });
    setTempBlob(mergedBlob);

    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    setPhase("review");
  }, [isWebView]);

  const resetRecording = useCallback(() => {
    WebViewFacade.resetRecording();

    setTempBlob(null);
    recordedChunksRef.current = [];
    mediaRecorderRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    setPhase("idle");
  }, []);

  /** 완료 → temp → 전역 session 저장 */
  const completeRecording = useCallback(() => {
    if (tempBlob) session.setFinalBlob(tempBlob);
    setTempBlob(null);
    setPhase("idle");
    setOpen(false);
  }, [tempBlob, session, setOpen]);

  /** WebView 메시지 수신 */
  useEffect(() => {
    if (!isWebView) return;
    const listener = (event: MessageEvent) => {
      const msg = parseMessage(event.data) as AppToWebMessage | null;
      if (!msg) return;

      switch (msg.type) {
        case "RECORD_STARTED":
          setPhase("recording");
          break;
        case "RECORD_COMPLETE": {
          if (msg.fileBase64) {
            const byteString = atob(msg.fileBase64);
            const arrayBuffer = new ArrayBuffer(byteString.length);
            const intArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteString.length; i++) {
              intArray[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([intArray], { type: msg.mimeType || "audio/webm" });
            setTempBlob(blob);
          }
          setPhase("review");
          break;
        }
        case "RECORD_ERROR":
          resetRecording();
          break;
      }
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [isWebView, resetRecording]);

  /** 다이얼로그 닫히면 temp만 제거 */
  useEffect(() => {
    if (!open) {
      setTempBlob(null);
      setPhase("idle");
    }
  }, [open]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.currentTime = 0;
      audio.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const value = useMemo<RecordingDrawerContextValue>(
    () => ({
      open,
      setOpen,
      isDesktop,
      phase,
      setPhase,
      tempBlob,
      tempUrl,
      setTempBlob,
      startRecording,
      stopRecording,
      resetRecording,
      completeRecording,
      isPlaying,
      togglePlay,
    }),
    [
      open,
      isDesktop,
      phase,
      tempBlob,
      tempUrl,
      startRecording,
      stopRecording,
      resetRecording,
      completeRecording,
      isPlaying,
      togglePlay,
      setOpen,
    ]
  );

  return (
    <RecordingDrawerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} src={tempUrl ?? undefined} hidden />
    </RecordingDrawerContext.Provider>
  );
}
