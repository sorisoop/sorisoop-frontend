import BackHeaderLayout from "@/shared/layouts/back-header-layout";
import { SubscribeManage } from "@/features/subscription/components";

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
