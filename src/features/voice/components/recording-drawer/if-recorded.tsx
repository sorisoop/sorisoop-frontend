import type { ReactNode } from "react";
import { useRecordingDrawer } from "@/features/voice/hooks/use-recording-drawer";

type Props = {
  children: ReactNode;
};

export default function IfRecorded({ children }: Props) {
  const { audioBlob } = useRecordingDrawer();

  if (!audioBlob) return null;
  return <>{children}</>;
}
