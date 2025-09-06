import { useState, useCallback } from "react";
import { MissionStep } from "@/features/parents/mission/types";
import { MissionFlowContext } from "@/features/parents/mission/contexts";

export function MissionFlowProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<MissionStep>(MissionStep.SELECT_CHILD);
  const [stepHistory, setStepHistory] = useState<MissionStep[]>([MissionStep.SELECT_CHILD]);
  const [profileId, setProfileId] = useState<number | null>(null);
  const [missionType, setMissionType] = useState<string | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [missionTitle, setMissionTitle] = useState("");
  const [targetCategoryId, setTargetCategoryId] = useState<number | null>(null);
  const [targetCount, setTargetCount] = useState<number | null>(null);
  const [targetFairyTaleIds, setTargetFairyTaleIds] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToStep = useCallback(
    (next: MissionStep) => {
      if (isTransitioning || step === next) return;

      const existingIndex = stepHistory.indexOf(next);
      const currentIndex = stepHistory.indexOf(step);

      // 이미 있는 스텝으로 가는 경우 = backward
      const newDirection = existingIndex !== -1 && existingIndex < currentIndex ? "backward" : "forward";

      setIsTransitioning(true);
      setDirection(newDirection);

      requestAnimationFrame(() => {
        setStep(next);

        // forward인 경우에만 히스토리 추가
        if (newDirection === "forward") {
          setStepHistory((prev) => [...prev, next]);
        }

        setTimeout(() => setIsTransitioning(false), 350);
      });
    },
    [step, stepHistory, isTransitioning]
  );

  const goBack = useCallback(() => {
    const currentIndex = stepHistory.indexOf(step);
    if (currentIndex > 0) {
      const previousStep = stepHistory[currentIndex - 1];

      setIsTransitioning(true);
      setDirection("backward");

      requestAnimationFrame(() => {
        setStep(previousStep);
        setTimeout(() => setIsTransitioning(false), 350);
      });

      return true;
    }
    return false;
  }, [step, stepHistory]);

  const resetHistory = useCallback(() => {
    setStepHistory([MissionStep.SELECT_CHILD]);
    setStep(MissionStep.SELECT_CHILD);
  }, []);

  return (
    <MissionFlowContext.Provider
      value={{
        step,
        setStep,
        stepHistory,
        profileId,
        setProfileId,
        missionType,
        setMissionType,
        missionTitle,
        setMissionTitle,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        targetCategoryId,
        setTargetCategoryId,
        targetCount,
        setTargetCount,
        targetFairyTaleIds,
        setTargetFairyTaleIds,
        goToStep,
        goBack,
        resetHistory,
        direction,
        isTransitioning,
      }}
    >
      {children}
    </MissionFlowContext.Provider>
  );
}
