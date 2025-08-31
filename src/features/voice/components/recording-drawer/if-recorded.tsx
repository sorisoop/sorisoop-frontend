import type { ReactNode } from "react";
import { useRecordingSessionContext } from "../../hooks";

type Props = {
  children: ReactNode;
};

export default function IfRecorded({ children }: Props) {
  const { finalBlob } = useRecordingSessionContext();

  if (!finalBlob) return null;
  return <>{children}</>;
}
