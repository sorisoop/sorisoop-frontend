import { useProfileDeleteContext } from "../hooks/use-profile-delete-context";
import { useDeleteProfile } from "@/entities/profile/api/mutations";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { useIsDeskTop } from "@/shared/hooks";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import { AlertTriangle } from "lucide-react";

export function ProfileDeleteDialog() {
  const { open, setOpen, targetId, setTargetId } = useProfileDeleteContext();
  const { mutate: deleteProfile, isPending } = useDeleteProfile();
  const isDesktop = useIsDeskTop();

  const handleDelete = () => {
    if (!targetId) return;
    deleteProfile(targetId, {
      onSuccess: () => {
        toast.success("프로필이 삭제되었습니다", { position: "top-right" });
        setOpen(false);
        setTargetId(null);
      },
    });
  };

  const handleCancel = () => {
    setOpen(false);
    setTargetId(null);
  };

  const Wrapper = isDesktop ? Dialog : Drawer;
  const Inner = isDesktop ? DialogContent : DrawerContent;
  const Header = isDesktop ? DialogHeader : DrawerHeader;
  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Description = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <Wrapper open={open} onOpenChange={setOpen}>
      <Inner className={cn("sm:max-w-sm", !isDesktop && "px-4 pb-4")}>
        <Header className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/15">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <Title className="text-left">프로필 삭제</Title>
          <Description className="text-left">
            이 작업은 되돌릴 수 없습니다. 정말로 프로필을 삭제하시겠습니까?
          </Description>
        </Header>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={handleCancel} disabled={isPending} className="sm:order-1 border-border">
            취소
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending} className="sm:order-2">
            {isPending && <SpinnerIcon className="mr-2 h-4 w-4" />}
            {isPending ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </Inner>
    </Wrapper>
  );
}
