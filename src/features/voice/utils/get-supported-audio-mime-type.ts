/**
 * 브라우저가 지원하는 오디오 MIME 타입을 후보 순서대로 선택
 * 지원 항목이 없으면 빈 문자열 반환
 */
export const getSupportedAudioMimeType = (): string => {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/mpeg", "audio/ogg"];

  for (const candidateMimeType of candidates) {
    if (MediaRecorder.isTypeSupported(candidateMimeType)) {
      return candidateMimeType;
    }
  }
  return "";
};
