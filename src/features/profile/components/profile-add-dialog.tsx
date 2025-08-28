import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/shared/components/ui/drawer";
import { useIsDeskTop } from "@/shared/hooks";
import { ProfileAddForm, type AddProfileFormSubmit } from "./profile-add-form";
import { useProfileAddContext } from "../hooks";
import { useCreateProfile } from "@/entities/profile/api/mutations";

export function ProfileAddDialog() {
  const { isOpen, setOpen } = useProfileAddContext();
  const { mutate: createProfile, isPending } = useCreateProfile();

  const isDesktop = useIsDeskTop();

  const handleSubmit = (data: AddProfileFormSubmit) => {
    createProfile(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };
  if (!isDesktop) {
    return (
      <Drawer open={isOpen} onOpenChange={setOpen}>
        <DrawerContent className="flex flex-col max-h-dvh pb-4">
          <DrawerHeader>
            <DrawerTitle className="sr-only">새 프로필 추가</DrawerTitle>
            <DrawerDescription className="sr-only">새 프로필을 등록할 수 있어요.</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-1">
            <ProfileAddForm onSubmit={handleSubmit} isPending={isPending} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="w-full !max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>새 프로필 추가</DialogTitle>
          <DialogDescription className="sr-only">새 프로필을 등록할 수 있어요.</DialogDescription>
        </DialogHeader>
        <ProfileAddForm onSubmit={handleSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
