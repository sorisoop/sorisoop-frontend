function detectMimeType(base64: string): string {
  if (base64.startsWith("SUQz")) return "audio/mpeg";
  if (base64.startsWith("UklG")) return "audio/wav";
  if (base64.startsWith("T2dn")) return "audio/ogg";
  if (base64.startsWith("GkXf")) return "audio/webm";
  return "audio/mpeg";
}

export const base64ToAudioUrl = (base64: string): string => {
  const byteChars = atob(base64);
  const byteNumbers = new Array(byteChars.length);
  for (let i = 0; i < byteChars.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // 여기서 MIME 탐지
  const mimeType = detectMimeType(base64);
  const blob = new Blob([byteArray], { type: mimeType });
  const url = URL.createObjectURL(blob);
  return url;
};
