import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";

import { useRecordingDrawer } from "@/features/voice/hooks";

type TriggerProps = { children?: ReactElement<{ onClick?: (e: React.MouseEvent) => void }> };

export default function RecordingDrawerTrigger({ children }: TriggerProps) {
  const { setOpen } = useRecordingDrawer();
  if (!children || !isValidElement(children)) return null;

  const prevOnClick = children.props.onClick;

  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      prevOnClick?.(e);
      (e.currentTarget as HTMLElement).blur();
      setOpen(true);
    },
  });
}
