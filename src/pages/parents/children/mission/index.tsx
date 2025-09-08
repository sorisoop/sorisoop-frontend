import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { BackHeaderLayout } from "@/shared/layouts";
import { ChildrenMissionList, ChildrenMissionListSkeleton } from "@/features/parents/components";
import { MissionDetailDialog } from "@/features/parents/components/mission-detail-dialog";

export default function ChildrenMissionPage() {
  const { childId } = useParams<{ childId: string }>();

  return (
    <BackHeaderLayout title="아이 미션">
      <Suspense fallback={<ChildrenMissionListSkeleton />}>
        <ChildrenMissionList childId={Number(childId)}>
          {(missionId, open, setOpen) => (
            <MissionDetailDialog missionId={missionId} open={open} onOpenChange={setOpen} />
          )}
        </ChildrenMissionList>
      </Suspense>
    </BackHeaderLayout>
  );
}
