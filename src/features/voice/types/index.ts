export type Phase = "idle" | "recording" | "review";

export type CharacterCandidate = {
  id: string;
  name: string;
  avatar: string;
};

export type MicPermissionStatus = "unknown" | "granted" | "denied" | "prompt";

export type UseMicrophonePermission = {
  isMediaDevicesSupported: boolean;
  status: MicPermissionStatus;
  queryPermission: () => Promise<MicPermissionStatus>;
  requestPermission: () => Promise<MicPermissionStatus>;
};

export type StartRecordingParams = { getMediaStream: () => Promise<MediaStream> } | undefined;

export type AudioRecorderHandle = {
  isRecording: boolean;

  audioBlob: Blob | null;
  audioObjectUrl: string | null;

  startRecording: (params: StartRecordingParams) => Promise<void>;
  stopRecording: () => Promise<void>;
  resetRecording: () => void;
};

export type VoiceFormValues = {
  title: string;
  imageUrl: string;
  voiceFile: File | null;
};
