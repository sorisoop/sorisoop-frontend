import { useProfiles } from "@/entities/profile/api/hooks";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/shared/components/ui/drawer";
import { useSelectProfile } from "@/entities/profile/api/mutations";
import { cn } from "@/shared/lib/utils";
import { useIsDeskTop } from "@/shared/hooks";

export type MypageProfileEditDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function MypageProfileEditDialog({ open, onOpenChange }: MypageProfileEditDialogProps) {
  const { data: profiles } = useProfiles();
  const { mutate: selectProfile, isPending } = useSelectProfile();
  const isDesktop = useIsDeskTop();

  const handleSelect = (id: number) => {
    selectProfile(id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  const ProfileList = (
    <ul className="divide-y divide-border">
      {profiles?.map((p) => (
        <li
          key={p.id}
          className={cn(
            "flex items-center justify-between py-3 cursor-pointer rounded hover:bg-muted transition-colors"
          )}
          onClick={() => handleSelect(p.id)}
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

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>프로필 변경</DialogTitle>
            <DialogDescription className="sr-only">등록된 프로필 중 하나를 선택해 변경하세요.</DialogDescription>
          </DialogHeader>
          {ProfileList}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="px-4 pb-4"
        ref={(el) => {
          if (el) {
            requestAnimationFrame(() => {
              const focusable = el.querySelector<HTMLElement>("button, [tabindex]:not([tabindex='-1'])");
              focusable?.focus();
            });
          }
        }}
      >
        <DrawerHeader>
          <DrawerTitle className="sr-only">프로필 변경</DrawerTitle>
          <DrawerDescription className="sr-only">등록된 프로필 중 하나를 선택해 변경하세요.</DrawerDescription>
        </DrawerHeader>
        {ProfileList}
      </DrawerContent>
    </Drawer>
  );
}
