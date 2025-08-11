import type { ReactNode } from "react";

import { Dialog } from "@/shared/components/ui/dialog";
import { Drawer } from "@/shared/components/ui/drawer";

import { RecordingDrawerProvider } from "@/features/voice/providers";
import { useRecordingDrawer } from "@/features/voice/hooks";

type RootProps = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: ReactNode;
};

function Shell({ children }: { children: ReactNode }) {
  const { open, setOpen, isDesktop } = useRecordingDrawer();
  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      {children}
    </Drawer>
  );
}

export default function RecordingDrawerRoot({ open, onOpenChange, children }: RootProps) {
  return (
    <RecordingDrawerProvider open={open} onOpenChange={onOpenChange}>
      <Shell>{children}</Shell>
    </RecordingDrawerProvider>
  );
}
