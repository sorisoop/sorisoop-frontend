import { SubscribeManage } from "@/features/subscription/components";
import { BackHeaderLayout } from "@/shared/layouts";

export default function SubscribeManagePage() {
  return (
    <BackHeaderLayout title="구독 관리">
      <SubscribeManage>
        <SubscribeManage.Active />
        <SubscribeManage.Empty />
        <SubscribeManage.Notice />
        <SubscribeManage.CancelDialog />
      </SubscribeManage>
    </BackHeaderLayout>
  );
}
