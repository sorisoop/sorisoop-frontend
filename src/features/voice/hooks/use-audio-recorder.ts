import { useCallback, useEffect, useRef, useState } from "react";
import type { AudioRecorderHandle, StartRecordingParams } from "../types";
import { useObjectUrl } from "./use-object-url";
import { getSupportedAudioMimeType } from "../utils";
/**
 * useAudioRecorder
 *
 * 브라우저의 MediaRecorder API를 활용해 오디오를 녹음하고
 * 녹음된 Blob 및 재생 URL을 관리하는 커스텀 훅.
 *
 * 기능:
 * - MediaRecorder 지원 여부 감지
 * - 오디오 녹음 시작/중지/리셋
 * - 녹음 결과 Blob과 Object URL 제공
 *
 * 반환 값:
 * - isMediaRecorderSupported: MediaRecorder 지원 여부
 * - isRecording: 현재 녹음 상태 여부
 * - audioBlob: 녹음된 오디오 Blob
 * - audioObjectUrl: 녹음된 오디오 Blob의 재생 URL
 * - startRecording: 녹음 시작 함수
 * - stopRecording: 녹음 종료 함수
 * - resetRecording: 녹음 상태 초기화 함수
 *
 */
export const useAudioRecorder = (): AudioRecorderHandle => {
  const isMediaRecorderSupported =
    typeof window !== "undefined" &&
    typeof (window as unknown as { MediaRecorder?: unknown }).MediaRecorder !== "undefined";

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const recordedChunksRef = useRef<Blob[]>([]);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const { objectUrl: audioObjectUrl } = useObjectUrl(audioBlob);

  const startRecording = useCallback(
    async ({ getMediaStream }: StartRecordingParams) => {
      if (!isMediaRecorderSupported) throw new Error("지원하지 않는 브라우저 입니다.");

      setAudioBlob(null);
      recordedChunksRef.current = [];

      const stream = await getMediaStream();
      mediaStreamRef.current = stream;

      const selectedMimeType = getSupportedAudioMimeType();
      const recorder = new MediaRecorder(stream, selectedMimeType ? { mimeType: selectedMimeType } : undefined);
      mediaRecorderRef.current = recorder;

      const handleData = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      recorder.addEventListener("dataavailable", handleData);

      recorder.start();
      setIsRecording(true);
    },
    [isMediaRecorderSupported]
  );

  const stopRecording = useCallback(async () => {
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
    setAudioBlob(mergedBlob);

    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;

    setIsRecording(false);
  }, []);

  const resetRecording = useCallback(() => {
    setIsRecording(false);
    setAudioBlob(null);

    recordedChunksRef.current = [];
    mediaRecorderRef.current = null;

    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return {
    isMediaRecorderSupported,
    isRecording,
    audioBlob,
    audioObjectUrl,
    startRecording,
    stopRecording,
    resetRecording,
  };
};
