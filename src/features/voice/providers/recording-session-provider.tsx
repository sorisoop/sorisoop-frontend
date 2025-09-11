import { useMemo, useState } from "react";
import { useObjectUrl } from "@/features/voice/hooks";
import { RecordingSessionContext } from "@/features/voice/contexts";

export function RecordingSessionProvider({ children }: { children: React.ReactNode }) {
  const [finalBlob, setFinalBlob] = useState<Blob | null>(null);
  const { objectUrl: finalUrl } = useObjectUrl(finalBlob);

  const [stopPlayback, setStopPlayback] = useState<(() => void) | null>(null);

  const value = useMemo(
    () => ({ finalBlob, finalUrl, setFinalBlob, stopPlayback, setStopPlayback }),
    [finalBlob, finalUrl, stopPlayback]
  );

  return <RecordingSessionContext.Provider value={value}>{children}</RecordingSessionContext.Provider>;
}
