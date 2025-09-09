import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/shared/components/ui/dialog";
import { useMissionDetail } from "@/entities/mission/api/hooks";
import { Suspense } from "react";
import { Badge } from "@/shared/components/ui/badge";
import type { MissionDetailResponse } from "@/entities/mission/models";
import { Progress } from "@/shared/components/ui/progress";
import { SpinnerIcon } from "@/shared/components/ui/spinner";

export default function MissionDetailDialog({
  missionId,
  open,
  onOpenChange,
}: {
  missionId: number | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  if (!missionId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Suspense
        fallback={
          <DialogContent className="max-w-sm w-full p-6">
            <DialogTitle className="text-lg font-semibold">미션 상세</DialogTitle>
            <DialogDescription className="sr-only">미션의 상세정보를 조회합니다.</DialogDescription>
            <SpinnerIcon className="mx-auto" />
          </DialogContent>
        }
      >
        <MissionDetail missionId={missionId} />
      </Suspense>
    </Dialog>
  );
}

function MissionDetail({ missionId }: { missionId: number }) {
  const { data } = useMissionDetail(missionId);

  return (
    <DialogContent className="max-w-sm w-full max-h-[60vh] overflow-y-auto p-6">
      <DialogTitle className="text-lg font-semibold">미션 상세</DialogTitle>
      <DialogDescription className="sr-only">미션의 상세정보를 조회합니다.</DialogDescription>

      <div className="space-y-6">{renderMissionContent(data)}</div>
    </DialogContent>
  );
}

function renderMissionContent(mission: MissionDetailResponse) {
  switch (mission.missionType) {
    case "READ_BOOK":
      return (
        <div className="space-y-4">
          <h3 className="font-medium">책 읽기 미션</h3>
          <div className="mt-4 grid gap-4 grid-cols-2" role="list">
            {mission.readBookMissionInfoDtos?.map((book) => (
              <div
                key={book.fairyTaleId}
                role="listitem"
                className="group relative block aspect-[3/4] rounded-md overflow-hidden bg-muted shadow hover:shadow-md transition"
              >
                <img
                  src={book.thumbnailImage}
                  alt={`동화책 ${book.title} 표지`}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition"
                />

                <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="relative p-2">
                    <h4 className="font-serif italic text-sm font-bold text-background drop-shadow-sm leading-snug line-clamp-2">
                      {book.title}
                    </h4>
                  </div>
                </div>

                <div className="absolute right-2 top-2">
                  {book.read ? (
                    <Badge className="rounded-full bg-green-500 text-white h-5 px-2 text-xs">읽음</Badge>
                  ) : (
                    <Badge className="rounded-full bg-secondary text-foreground h-5 px-2 text-xs">안 읽음</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "READ_CATEGORY":
      return (
        <div className="space-y-3">
          <h3 className="font-medium">카테고리 읽기 미션</h3>
          <p className="text-sm">
            카테고리: <Badge variant="outline">{mission.category}</Badge>
          </p>
          <Progress value={(mission.completedCount / mission.targetCount) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground">
            진행: {mission.completedCount} / {mission.targetCount}
          </p>
        </div>
      );

    case "CREATE_FAIRY_TALE":
      return (
        <div className="space-y-3">
          <h3 className="font-medium">동화 만들기 미션</h3>
          <Progress value={(mission.completedCount / mission.targetCount) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground">
            진행: {mission.completedCount} / {mission.targetCount}
          </p>
        </div>
      );

    default:
      return <p className="text-sm text-muted-foreground">알 수 없는 미션 타입</p>;
  }
}
