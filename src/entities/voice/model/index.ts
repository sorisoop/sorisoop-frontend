export interface VoiceResponse {
  id: number;
  profileId: number;
  imageUrl: string;
  title: string;
}

export interface AddVoicePayload {
  title: string;
  imageUrl: string;
}

export interface AddVoiceRequest {
  voiceFile: File;
  request: AddVoicePayload;
}
