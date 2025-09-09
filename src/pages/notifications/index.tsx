import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BackHeaderLayout } from "@/shared/layouts";
import { NotificationList, NotificationListSkeleton } from "@/features/notification";
import { ErrorFallback } from "@/shared/components/error-boundary";

export default function NotificationsPage() {
  return (
    <BackHeaderLayout title="알림">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<NotificationListSkeleton />}>
          <NotificationList />
        </Suspense>
      </ErrorBoundary>
    </BackHeaderLayout>
  );
}
