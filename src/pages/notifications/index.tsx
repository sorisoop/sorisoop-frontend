import { Suspense } from "react";
import { BackHeaderLayout } from "@/shared/layouts";
import { NotificationList, NotificationListSkeleton } from "@/features/notification";

export default function NotificationsPage() {
  return (
    <BackHeaderLayout title="알림">
      <Suspense fallback={<NotificationListSkeleton />}>
        <NotificationList />
      </Suspense>
    </BackHeaderLayout>
  );
}
