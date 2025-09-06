import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";
import { MissionStep } from "@/features/parents/mission/types";
import { Button } from "@/shared/components/ui/button";
import { useDragScroll } from "@/shared/hooks";
import { pickEmoji } from "@/shared/utils/emoji";
import { useFairyTaleCategories } from "@/entities/fairy-tale/api/hooks";

export default function ReadByCategory() {
  const { data: allCategories = [] } = useFairyTaleCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { goToStep, step, setTargetCategoryId } = useMissionFlowContext();
  const { onMouseDown, onMouseMove, onMouseUp } = useDragScroll<HTMLDivElement>();

  const handleNext = () => {
    if (!selectedCategory) return;
    setTargetCategoryId(selectedCategory);
    goToStep(MissionStep.INPUT_BOOK_COUNT);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mt-6">카테고리를 선택해주세요</h2>
      <p className="text-base text-muted-foreground mt-2 mb-6">원하는 주제를 골라 동화를 추천받을 수 있어요</p>

      <div
        className="flex gap-6 pb-2 py-1 overflow-x-auto overflow-y-visible scroll-smooth [scrollbar-width:none] [scrollbar-color:transparent_transparent] outline-none focus:outline-none focus-visible:outline-none"
        tabIndex={-1}
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-label="카테고리 선택"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        {allCategories.map(({ id, name }) => {
          const emoji = pickEmoji(name);
          const isSelected = selectedCategory === id;

          return (
            <div key={id ?? name} className="shrink-0 text-center">
              <Button
                variant="ghost"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(id)}
                className={[
                  "relative mx-auto h-20 w-20 p-0 rounded-full cursor-pointer",
                  "shadow-sm hover:shadow-md transition",
                  isSelected
                    ? "bg-primary/10 border-2 border-primary text-primary"
                    : "bg-muted/30 border border-border",
                ].join(" ")}
              >
                <span className="text-2xl select-none">{emoji}</span>
              </Button>
              <p
                className={[
                  "mt-2 text-sm font-medium leading-tight",
                  isSelected ? "text-primary" : "text-foreground",
                ].join(" ")}
              >
                {name}
              </p>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 max-w-screen-xl w-full bg-background border-t py-4"
        >
          <div className="px-4">
            <Button
              onClick={handleNext}
              disabled={!selectedCategory}
              className="w-full h-10 font-semibold text-secondary cursor-pointer"
            >
              선택
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
