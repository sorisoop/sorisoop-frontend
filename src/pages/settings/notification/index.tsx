import { NotificationSettingsToggle, NotificationSettingsToggleSkeleton } from "@/features/notification";
import { ErrorFallback } from "@/shared/components/error-boundary";
import { BackHeaderLayout } from "@/shared/layouts";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function NotificationSettingsPage() {
  return (
    <BackHeaderLayout title="알림">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <div className="divide-y divide-border">
          <Suspense fallback={<NotificationSettingsToggleSkeleton />}>
            <NotificationSettingsToggle />
          </Suspense>
        </div>
      </ErrorBoundary>
    </BackHeaderLayout>
  );
}
