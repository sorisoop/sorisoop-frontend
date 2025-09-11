import { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { useIsDeskTop } from "@/shared/hooks";
import { useProfileManageDialogContext } from "../hooks";
import { AnimatePresence, motion } from "framer-motion";
import ProfileManageDialogList from "./profile-manage-dialog-list";
import ProfileManageDialogUpdate from "./profile-manage-dialog-update";

export function ProfileManageDialogContent() {
  const { open, setOpen, selectedProfile, setSelectedProfile } = useProfileManageDialogContext();
  const isDesktop = useIsDeskTop();
  const innerRef = useRef<HTMLDivElement>(null);
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setSelectedProfile(null);
    }
    setOpen(next);
  };

  const Wrapper = isDesktop ? Dialog : Drawer;
  const Inner = isDesktop ? DialogContent : DrawerContent;
  const Header = isDesktop ? DialogHeader : DrawerHeader;
  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Description = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <Wrapper open={open} onOpenChange={handleOpenChange}>
      <Inner
        ref={innerRef}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          // 내부 첫 번째 포커스 가능한 엘리먼트로 강제 이동
          const firstFocusable = innerRef.current?.querySelector<HTMLElement>(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
          );
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            // 아무 것도 없으면 content 자체에 focus 가능하게 처리
            innerRef.current?.setAttribute("tabIndex", "-1");
            innerRef.current?.focus();
          }
        }}
        className={`
          ${isDesktop ? "max-w-sm" : "h-dvh"} 
          px-4 pb-4 flex flex-col
        `}
      >
        <Header>
          <Title className="sr-only">프로필 관리</Title>
          <Description className="sr-only">등록된 프로필을 선택하거나 수정할 수 있습니다.</Description>
        </Header>
        <div className="relative w-full overflow-auto">
          <AnimatePresence mode="wait" initial={false}>
            {!selectedProfile ? (
              <motion.div
                key="list"
                className="w-full"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProfileManageDialogList />
              </motion.div>
            ) : (
              <motion.div
                key="update"
                className="w-full"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ProfileManageDialogUpdate profile={selectedProfile} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Inner>
    </Wrapper>
  );
}
