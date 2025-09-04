import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useProfiles } from "@/entities/profile/api/hooks";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/shared/components/ui/drawer";
import { useSelectProfile } from "@/entities/profile/api/mutations";
import { cn } from "@/shared/lib/utils";
import { useIsDeskTop } from "@/shared/hooks";
import { Input } from "@/shared/components/ui/input";

export type MypageProfileEditDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

type Step = "LIST" | "PASSWORD";

const variants = {
  enter: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? 100 : -100,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? -100 : 100,
    opacity: 0,
  }),
};

export default function MypageProfileEditDialog({ open, onOpenChange }: MypageProfileEditDialogProps) {
  const { data: profiles } = useProfiles();
  const { mutate: selectProfile, isPending } = useSelectProfile();
  const navigate = useNavigate();
  const isDesktop = useIsDeskTop();

  const [step, setStep] = useState<Step>("LIST");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [targetId, setTargetId] = useState<number | null>(null);
  const [password, setPassword] = useState("");

  const goToPassword = (id: number) => {
    setTargetId(id);
    setDirection("forward");
    setStep("PASSWORD");
  };

  const goBackToList = () => {
    setDirection("backward");
    setStep("LIST");
    setPassword("");
    setTargetId(null);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetId) return;

    selectProfile(
      { profileId: targetId, password },
      {
        onSuccess: () => {
          onOpenChange(false);
          setPassword("");
          setTargetId(null);
          setStep("LIST");
          navigate("/parents");
        },
      }
    );
  };

  const ProfileList = (
    <ul className="divide-y divide-border">
      {profiles?.map((p) => (
        <li
          key={p.id}
          className={cn(
            "flex items-center justify-between py-3 cursor-pointer rounded hover:bg-muted transition-colors"
          )}
          onClick={() =>
            p.role === "PARENT"
              ? goToPassword(p.id)
              : selectProfile({ profileId: p.id, password: null }, { onSuccess: () => onOpenChange(false) })
          }
        >
          <div className="flex items-center gap-3">
            <img
              src={p.profileImage ?? "/default.webp"}
              alt={p.nickname}
              className="w-12 h-12 rounded-full object-cover bg-muted"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">{p.nickname}</span>
              <span className="text-sm text-muted-foreground">
                {p.role === "CHILD" ? "아이" : "부모"} · {p.gender === "M" ? "남자" : "여자"} · {p.age}세
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="default"
            disabled={isPending}
            className="text-sm text-secondary font-semibold cursor-pointer"
          >
            선택
          </Button>
        </li>
      ))}
    </ul>
  );

  const PasswordForm = (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <Input
        type="password"
        placeholder="비밀번호 입력"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none"
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={goBackToList} className="cursor-pointer">
          취소
        </Button>
        <Button type="submit" disabled={isPending || !password} className="text-secondary font-semibold cursor-pointer">
          확인
        </Button>
      </div>
    </form>
  );

  const Content = (
    <div className="w-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        {step === "LIST" ? (
          <motion.div
            key="list"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full"
          >
            {ProfileList}
          </motion.div>
        ) : (
          <motion.div
            key="password"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full"
          >
            {PasswordForm}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{step === "LIST" ? "프로필 변경" : "비밀번호 확인"}</DialogTitle>
            <DialogDescription className="sr-only">
              {step === "LIST"
                ? "등록된 프로필 중 하나를 선택해 변경하세요."
                : "부모 프로필 접근을 위해 비밀번호를 입력하세요."}
            </DialogDescription>
          </DialogHeader>
          {Content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="px-4 pb-4 overflow-hidden">
        <DrawerHeader>
          <DrawerTitle className="sr-only">{step === "LIST" ? "프로필 변경" : "비밀번호 확인"}</DrawerTitle>
          <DrawerDescription className="sr-only">
            {step === "LIST"
              ? "등록된 프로필 중 하나를 선택해 변경하세요."
              : "부모 프로필 접근을 위해 비밀번호를 입력하세요."}
          </DrawerDescription>
        </DrawerHeader>
        {Content}
      </DrawerContent>
    </Drawer>
  );
}
