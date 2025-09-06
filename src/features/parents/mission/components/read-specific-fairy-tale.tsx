import { AnimatePresence, motion } from "framer-motion";
import { useInfiniteScroll } from "@/shared/hooks";
import { useFairyTalesByCategoryInfinite } from "@/entities/fairy-tale/api/hooks";
import { Spinner } from "@/shared/components/ui/spinner";
import { Button } from "@/shared/components/ui/button";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";
import { MissionStep } from "@/features/parents/mission/types";

export default function ReadSpecificFairyTale() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFairyTalesByCategoryInfinite(0);

  const { ref } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });
  const { targetFairyTaleIds = [], setTargetFairyTaleIds, goToStep } = useMissionFlowContext();

  const tales = data?.pages.flat() ?? [];

  const toggleSelect = (id: number) => {
    setTargetFairyTaleIds((prev: number[]): number[] =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (tales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] text-center px-4">
        <p className="text-lg font-semibold text-foreground">동화책이 아직 없어요.</p>
        <p className="mt-2 text-sm text-muted-foreground">다른 카테고리나 조건을 선택해 보세요.</p>
        <Button
          onClick={() => goToStep(MissionStep.SELECT_MISSION_TYPE)}
          className="mt-6 font-semibold cursor-pointer text-secondary"
        >
          다시 선택하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-1">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-4">
          {tales.map((tale) => {
            const isSelected = targetFairyTaleIds.includes(tale.id);
            return (
              <div
                key={tale.id}
                role="button"
                tabIndex={0}
                onClick={() => toggleSelect(tale.id)}
                className={[
                  "group relative block aspect-[3/4] rounded-md overflow-hidden hover:shadow-md transition cursor-pointer select-none",
                  isSelected ? "ring-4 ring-primary" : "ring-1 ring-transparent hover:ring-muted",
                ].join(" ")}
              >
                <img
                  src={tale.thumbnailImage}
                  draggable={false}
                  alt={`동화책 ${tale.title} 표지`}
                  onContextMenu={(e) => e.preventDefault()}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0">
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="relative p-3">
                    <h4 className="font-serif italic text-lg md:text-xl font-bold text-background drop-shadow-sm leading-snug line-clamp-2">
                      {tale.title}
                    </h4>
                    <p className="font-serif italic mt-1 text-background/90 text-xs">
                      {tale.author} · {tale.pageCount}p
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div ref={ref} className="h-4" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="select-button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-screen-xl w-full bg-background py-4 border-t"
        >
          <div className="px-4 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setTargetFairyTaleIds([])}
              disabled={targetFairyTaleIds.length === 0}
              className="flex-1 h-10 font-semibold cursor-pointer"
            >
              초기화
            </Button>

            <Button
              onClick={() => goToStep(MissionStep.INPUT_PERIOD)}
              disabled={targetFairyTaleIds.length === 0}
              className="flex-1 h-10 font-semibold text-secondary cursor-pointer"
            >
              {targetFairyTaleIds.length}개 선택
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
