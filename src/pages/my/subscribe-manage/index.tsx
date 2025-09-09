import { SubscribeManage } from "@/features/subscription/components";
import SubscribeManageSkeleton from "@/features/subscription/components/subscription-manage.skeleton";
import { BackHeaderLayout } from "@/shared/layouts";
import { Suspense } from "react";

export default function SubscribeManagePage() {
  return (
    <BackHeaderLayout title="구독 관리">
      <Suspense fallback={<SubscribeManageSkeleton />}>
        <SubscribeManage>
          <SubscribeManage.Active />
          <SubscribeManage.Empty />
          <SubscribeManage.CancelDialog />
        </SubscribeManage>
      </Suspense>
      <SubscribeManage.Notice />
    </BackHeaderLayout>
  );
}
