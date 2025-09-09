import { SubscribeManage } from "@/features/subscription/components";
import SubscribeManageSkeleton from "@/features/subscription/components/subscription-manage.skeleton";
import { ErrorFallback } from "@/shared/components/error-boundary";
import { BackHeaderLayout } from "@/shared/layouts";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function SubscribeManagePage() {
  return (
    <BackHeaderLayout title="구독 관리">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<SubscribeManageSkeleton />}>
          <SubscribeManage>
            <SubscribeManage.Active />
            <SubscribeManage.Empty />
            <SubscribeManage.CancelDialog />
          </SubscribeManage>
        </Suspense>
        <SubscribeManage.Notice />
      </ErrorBoundary>
    </BackHeaderLayout>
  );
}
