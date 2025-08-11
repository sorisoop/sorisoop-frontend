import { useMemo, useState } from "react";
import { RecordingDrawerContext } from "../contexts/recording-drawer-context";
import { useIsDeskTop } from "@/shared/hooks";

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

  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = (v: boolean) => {
    if (isControlled) onOpenChange?.(v);
    else setUncontrolledOpen(v);
  };

  const value = useMemo(() => ({ open, setOpen, isDesktop }), [open, isDesktop]);

  return <RecordingDrawerContext.Provider value={value}>{children}</RecordingDrawerContext.Provider>;
}
