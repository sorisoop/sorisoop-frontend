import { Suspense } from "react";
import { BackHeaderLayout } from "@/shared/layouts";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/error-boundary/";
import { MissionDetailDialog } from "@/features/mission/components";
import AssignedMissionList from "@/features/mission/components/assigned-mission-list";
import AssignedMissionListSkeleton from "@/features/mission/components/assigned-mission-list.skeleton";

export default function MissionsPage() {
  return (
    <BackHeaderLayout title="미션조회">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<AssignedMissionListSkeleton />}>
          <AssignedMissionList>
            {(missionId, open, setOpen) => (
              <MissionDetailDialog missionId={missionId} open={open} onOpenChange={setOpen} />
            )}
          </AssignedMissionList>
        </Suspense>
      </ErrorBoundary>
    </BackHeaderLayout>
  );
}
