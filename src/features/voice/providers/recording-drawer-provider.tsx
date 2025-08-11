import { useCallback, useMemo, useState } from "react";

import { useIsDeskTop } from "@/shared/hooks";

import { RecordingDrawerContext } from "../contexts/recording-drawer-context";

type RecordingDrawerProviderProps = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
};

export function RecordingDrawerProvider({
  open: controlledOpen,
  onOpenChange,
  children,
}: RecordingDrawerProviderProps) {
  const isDesktop = useIsDeskTop();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (isControlled) onOpenChange?.(v);
      else setUncontrolledOpen(v);
    },
    [isControlled, onOpenChange]
  );

  const value = useMemo(
    () => ({ open, setOpen, isDesktop, audioBlob, setAudioBlob }),
    [open, isDesktop, audioBlob, setOpen]
  );
  return <RecordingDrawerContext.Provider value={value}>{children}</RecordingDrawerContext.Provider>;
}
