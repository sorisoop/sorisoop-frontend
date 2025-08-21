import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerDescription,
} from "@/shared/components/ui/drawer";
import { useIsDeskTop } from "@/shared/hooks";
import { useSubscriptionManageContext } from "../hooks";
import { useDeleteSubscription } from "@/entities/subscription/api/mutations";

export function SubscribeCancelDialog() {
  const isDesktop = useIsDeskTop();
  const { isCancelDialogOpen, setCancelDialogOpen } = useSubscriptionManageContext();

  const deleteMutation = useDeleteSubscription();

  if (isDesktop) {
    return (
      <Dialog open={isCancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>구독을 해지하시겠습니까?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            해지하면 다음 결제일부터 요금이 부과되지 않습니다. <br />
            현재 이용중인 기간은 마지막 결제일까지 유지됩니다.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              className="cursor-pointer"
              disabled={deleteMutation.isPending}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                deleteMutation.mutate(undefined, {
                  onSuccess: () => setCancelDialogOpen(false),
                })
              }
              className="cursor-pointer"
              disabled={deleteMutation.isPending}
            >
              해지하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isCancelDialogOpen} onOpenChange={setCancelDialogOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left">구독 해지</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 text-sm text-muted-foreground">
          해지하면 다음 결제일부터 요금이 부과되지 않습니다. <br />
          현재 이용중인 기간은 마지막 결제일까지 유지됩니다.
        </div>
        <DrawerDescription className="sr-only"></DrawerDescription>
        <DrawerFooter className="pt-4 flex gap-2">
          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">
              취소
            </Button>
          </DrawerClose>
          <Button
            variant="destructive"
            onClick={() =>
              deleteMutation.mutate(undefined, {
                onSuccess: () => setCancelDialogOpen(false),
              })
            }
            className="cursor-pointer"
            disabled={deleteMutation.isPending}
          >
            해지하기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
