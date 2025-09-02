import { NotificationSettingsToggle, NotificationSettingsToggleSkeleton } from "@/features/notification";
import { BackHeaderLayout } from "@/shared/layouts";
import { Suspense } from "react";

export default function NotificationSettingsPage() {
  return (
    <BackHeaderLayout title="알림">
      <div className="divide-y divide-border">
        <Suspense fallback={<NotificationSettingsToggleSkeleton />}>
          <NotificationSettingsToggle />
        </Suspense>
      </div>
    </BackHeaderLayout>
  );
}
