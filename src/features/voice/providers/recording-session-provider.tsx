import { useMemo, useState } from "react";
import { useObjectUrl } from "../hooks";
import { RecordingSessionContext } from "../contexts";

export function RecordingSessionProvider({ children }: { children: React.ReactNode }) {
  const [finalBlob, setFinalBlob] = useState<Blob | null>(null);
  const { objectUrl: finalUrl } = useObjectUrl(finalBlob);

  const value = useMemo(() => ({ finalBlob, finalUrl, setFinalBlob }), [finalBlob, finalUrl]);

  return <RecordingSessionContext.Provider value={value}>{children}</RecordingSessionContext.Provider>;
}
