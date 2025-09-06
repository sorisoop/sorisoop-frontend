import { useState } from "react";
import { useMissionFlowContext } from "@/features/parents/mission/hooks";
import { MissionStep } from "@/features/parents/mission/types";
import { Button } from "@/shared/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const MISSION_TYPES = [
  {
    id: "READ_CATEGORY",
    imageUrl: "/assets/mission/read-category.png",
    title: "주제별 읽기 미션",
    description: "동화의 주제를 골라 흥미를 더해보세요.",
  },
  {
    id: "READ_BOOK",
    imageUrl: "/assets/mission/read-book.png",
    title: "특정 동화 읽기",
    description: "지정된 동화를 꼭 읽도록 도와주세요.",
  },
  {
    id: "CREATE_FAIRY_TALE",
    imageUrl: "/assets/mission/make-book.png",
    title: "직접 동화 만들기",
    description: "그림을 그려 나만의 동화를 완성해요!",
  },
];

export default function SelectMission() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { setMissionType, goToStep, step } = useMissionFlowContext();

  const handleNext = () => {
    if (!selectedType) return;

    setMissionType(selectedType);

    switch (selectedType) {
      case "READ_CATEGORY":
        goToStep(MissionStep.READ_BY_CATEGORY);
        break;
      case "READ_BOOK":
        goToStep(MissionStep.READ_SPECIFIC_FAIRY_TALE);
        break;
      case "CREATE_FAIRY_TALE":
        goToStep(MissionStep.CREATE_FAIRY_TALE);
        break;
      default:
        goToStep(MissionStep.SELECT_CHILD);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold text-left mt-6">미션 유형을 선택해주세요</h2>
      <p className="text-base text-muted-foreground mt-2 mb-8">원하는 미션 방식을 선택해 주세요</p>

      <div className="flex flex-col gap-y-4">
        {MISSION_TYPES.map((type) => {
          const isSelected = selectedType === type.id;
          return (
            <Button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              variant="ghost"
              className={`relative w-full flex items-start gap-4 rounded-lg text-left justify-start p-0 h-auto cursor-pointer transition`}
            >
              <img
                src={type.imageUrl}
                alt={type.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className={`text-base sm:text-lg ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {type.title}
                </span>
                <span className="text-sm sm:text-base text-muted-foreground font-normal">{type.description}</span>
              </div>
              {isSelected && (
                <span className="absolute top-1/2 right-4 -translate-y-1/2 rotate-[-10deg] text-xs font-bold uppercase tracking-widest text-primary border-2 border-primary px-2 py-0.5 rounded-md bg-background">
                  선택됨
                </span>
              )}
            </Button>
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
              disabled={!selectedType}
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
