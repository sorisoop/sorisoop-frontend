export interface VoiceResponse {
  id: number;
  profileId: number;
  imageUrl: string;
  title: string;
  speakerId: string;
}

export interface AddVoicePayload {
  title: string;
  imageUrl: string;
}

export interface AddVoiceRequest {
  voiceFile: File;
  request: AddVoicePayload;
}

export interface UpdateVoiceRequest {
  title: string;
  imageUrl: string;
}

export interface TtsResult {
  page: number;
  audio_base64: string;
}

export interface TtsResponse {
  fairyTaleId: number | null;
  profileId: number | null;
  speakerId: string | null;
  results: TtsResult[];
}
