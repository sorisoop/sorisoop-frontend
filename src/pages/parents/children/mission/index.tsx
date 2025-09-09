import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { BackHeaderLayout } from "@/shared/layouts";
import { ChildrenMissionList, ChildrenMissionListSkeleton } from "@/features/parents/components";
import { ParentsErrorFallback } from "@/shared/components/error-boundary/";
import { MissionDetailDialog } from "@/features/mission/components";

export default function ChildrenMissionPage() {
  const { childId } = useParams<{ childId: string }>();

  return (
    <BackHeaderLayout title="아이 미션">
      <ErrorBoundary fallback={<ParentsErrorFallback />}>
        <Suspense fallback={<ChildrenMissionListSkeleton />}>
          <ChildrenMissionList childId={Number(childId)}>
            {(missionId, open, setOpen) => (
              <MissionDetailDialog missionId={missionId} open={open} onOpenChange={setOpen} />
            )}
          </ChildrenMissionList>
        </Suspense>
      </ErrorBoundary>
    </BackHeaderLayout>
  );
}
